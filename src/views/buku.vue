<script>
import axios from "axios";
import {ref} from "vue";
import App from "@/App.vue";

const readBuku='https://syakiraspace.my.id/fayzashahira/readbuku.php';
const insertBuku = 'https://syakiraspace.my.id/fayzashahira/insertbuku.php';
const deleteBuku = 'https://syakiraspace.my.id/fayzashahira/deletebykodebuku.php';

export default {
  components: {App},
  data() {
    return {
      databuku: ref([]),
      insertJudulBuku: '',
      insertKodeBuku: '',
      insertPengarang: '',
      insertPenerbit: '',
      insertTahunTerbit: '',
      insertHarga: '',
      insertKodeKategori: '',
      file: '',
    }
  },
  mounted() {
    this.readBuku();
    this.insertBuku();
  },
  methods: {
    readBuku() {
      axios.get(readBuku).then((resp) => {
        console.log(resp);
        this.databuku = resp.data;
      })
          .catch((err) => {
            console.log(err);
          });
    },
    insertBuku() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();

      formData.append('judul_buku', this.insertJudulBuku);
      formData.append('kode_buku', this.insertKodeBuku);
      formData.append('pengarang', this.insertPengarang);
      formData.append('penerbit', this.insertPenerbit);
      formData.append('tahun', this.insertTahunTerbit);
      formData.append('harga', this.insertHarga);
      formData.append('kode_kategori', this.insertKodeKategori);
      formData.append('file_cover', this.file);

      axios
          .post(insertBuku, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resp) => {
            console.log(resp.data);
            this.databuku();
            this.insertJudulBuku = '';
            this.insertKodeBuku = '';
            this.insertPengarang = '';
            this.insertPenerbit = '';
            this.insertTahunTerbit = '';
            this.insertHarga = '';
            this.insertKodeKategori = '';
            this.$refs.file.value = '';
          })
          .catch((err) => {
            console.log(err);
          });
    },
    delBuku(kode_buku) {
      if (confirm('Apakah Anda Ingin Menghapus Data Buku?')) {
        axios
            .get(deleteBuku + '?kode_buku=' + kode_buku)
            .then((resp) => {
              console.log(resp);
              this.readBuku();
            })
            .catch((err) => {
              console.log(err);
            });
      };
    }
  }
}
</script>

<template>
  <h3>Silahkan Scroll Kebawah untuk Melihat Koleksi Buku</h3><br>
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
  </svg>
  <tr v-for="(data) in databuku">
  <div class="card text-center">
    <div class="card-header">
      {{data.kode_buku}}
    </div>
    <div class="card-body">
      <h4 class="card-title">{{data.judul_buku}}</h4>
      <div class="card" style="width: 25rem;">
        <img :src="data.file_cover" class="rounded" alt="cover"/>
        <div class="card-body">
          <p class="card-text"></p>
          Penulis: {{data.pengarang}}<br>
          Penerbit: {{data.penerbit}}<br>
          Tahun Terbit: {{data.tahun}}<br>
          <h5>Rp. {{data.harga}}</h5>
          <router-link
              :to="{ name: 'bukuUpdate', params: {kode_buku: data.kode_buku}}"
              class="btn btn-outline-success"
          >Update</router-link>
          <button type="button" class="btn btn-outline-danger" v-on:click="delBuku(data.kode_buku)"
          >Delete</button>
        </div>
        <div class="card-footer text-muted">
          {{data.tanggal_input}}
        </div>
      </div>
    </div>
  </div>
  </tr>
  <h6>Isi Data Dibawah Jika Ingin Menambahkan Koleksi Buku</h6>
  <div class="modal-body">
    <input
        class="form-control"
        type="text"
        v-model="insertJudulBuku"
        placeholder="Judul Buku"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertKodeBuku"
        placeholder="Kode Buku"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertPengarang"
        placeholder="Pengarang"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertPenerbit"
        placeholder="Penerbit"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertTahunTerbit"
        placeholder="Tahun Terbit"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertHarga"
        placeholder="Harga"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertKodeKategori"
        placeholder="Kode Kategori"
        aria-label="default input example" /><br />
    <div class="mb-3">
      <input
          class="form-control"
          type="file"
          ref="file"
          id="formFile" />
    </div>
  </div>

  <button
      type="button"
      class="btn-primary"
      v-on:click="insertBuku()">
    Tambahkan Buku
  </button>

</template>


<style scoped>
h3{
  margin-top: 20px;
  margin-left: 490px;
  font-family: "sans-serif";
  font-size: 20px;
  font-weight: bold;
  color: cornflowerblue;
  display: flex;
  justify-content: space-between;
}
svg{
  margin-left: 700px;
  color: midnightblue;
  margin-bottom: 20px;
}
body{
  background-color: floralwhite;
}
img {
  height: 230px;
  width: 40%;
}
.card-header{
  background-color: cornflowerblue;
  color: #f2f2f2;
}
.card-footer{
  background-color: cornflowerblue;
  color: #f2f2f2;
}
.modal-body{
  margin-left: 200px;
  margin-right: 200px;
  font-weight: bolder;
  margin-top: 20px;
}
hr{
  font-weight: bolder;
}
.btn-outline-danger{
  width: 70px;height: 30px;
  font-size: small;
  margin-left: 10px;
  font-weight: bold;
}
.btn-outline-success{
  width: 70px;height: 30px;
  font-size: small;
  font-weight: bold;
}
.rounded{
  margin-left: 130px;
  margin-top: 30px;
}
.text-center{
  margin-left: 500px;
  font-family: -apple-system;
  margin-bottom: 10px;
}
h6{
  margin-top: 40px;
  margin-left: 490px;
  font-family: "sans-serif";
  font-size: 20px;
  font-weight: bold;
  color: midnightblue;
  display: flex;
  justify-content: space-between;
}
.btn-primary{
  margin-left: 630px;
  background-color: cornflowerblue;
  border-color: cornflowerblue;
  border-radius: 5px;
  font-family: "-apple-system";
  margin-bottom: 80px;
  color: #f2f2f2;
}
</style>
<script>
import {RouterLink} from "vue-router";
import axios from "axios";
import {ref} from 'vue';
// import App from "@/App.vue";

const updateBuku = 'https://faayshabookstore.000webhostapp.com/moonlitbook/updatebykodebuku.php';
const selectKodeBuku = 'https://faayshabookstore.000webhostapp.com/moonlitbook/selectbykodebuku.php';

export default {
  data() {
    return {
      selectBuku: ref([]),
      updateJudulBuku: '',
      updateKodeBuku: '',
      updatePengarang: '',
      updatePenerbit: '',
      updateTahunTerbit: '',
      updateHarga: '',
      updateKodeKategori: '',
      // file: '',
    };
  },
  mounted() {
    this.getBuku();
    this.updateBuku();
  },
  methods: {
    getBuku() {
      axios
          .get(selectKodeBuku + '?kode_buku=' + this.$route.params.kode_buku)
          .then((resp) => {
            console.log(resp);
            this.selectBuku = resp.data;
            this.updateJudulBuku = this.selectBuku.judul_buku;
            this.updateKodeBuku = this.selectBuku.kode_buku;
            this.updatePengarang = this.selectBuku.pengarang;
            this.updatePenerbit = this.selectBuku.penerbit;
            this.updateTahunTerbit = this.selectBuku.tahun;
            this.updateHarga = this.selectBuku.harga;
            this.updateKodeKategori = this.selectBuku.kode_kategori
            // this.file = this.selectBuku.file_cover;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    updateBuku() {
      // this.file = this.$refs.file.files[0];
      let formData = new FormData

      formData.append('judul_buku', this.updateJudulBuku);
      formData.append('kode_buku', this.$route.params.kode_buku);
      formData.append('pengarang', this.updatePengarang);
      formData.append('penerbit', this.updatePenerbit);
      formData.append('tahun', this.updateTahunTerbit);
      formData.append('harga', this.updateHarga);
      formData.append('kode_kategori', this.updateKodeKategori);
      // formData.append('file_cover', this.file);

      axios
          .post(updateBuku, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resp) => {
            console.log(resp.data);
            this.getBuku();
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
}
</script>


<template>
  <div class="modal-body">
    <input
        class="form-control"
        type="text"
        v-model="updateJudulBuku"
        placeholder="Judul Buku"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="updateKodeBuku"
        placeholder="Kode Buku"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="updatePengarang"
        placeholder="Pengarang"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="updatePenerbit"
        placeholder="Penerbit"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="updateTahunTerbit"
        placeholder="Tahun Terbit"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="updateHarga"
        placeholder="Harga"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="updateKodeKategori"
        placeholder="Kode Kategori"
        aria-label="default input example" /><br />
    <div class="mb-3">
      <input
          class="form-control"
          type="file"
          ref="file"
          id="formFile" />
      <img src = "file" alt="file_cover" style="width: 120px; margin-top: 10px">
    </div>
  </div>

  <td><button
      type="button"
      class="btn btn-primary"
      v-on:click="updateBuku()">
    Update Buku
  </button>
  <router-link to="/buku" class="btn btn-secondary me-5"
               ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
  </svg>back</router-link>
  </td>
</template>


<style scoped>
.modal-body{
  margin-left: 250px;
  margin-right: 250px;
  font-weight: bolder;
  margin-top: 40px;
}
.btn-primary{
  margin-left: 630px;
  background-color: cornflowerblue;
  border-color: cornflowerblue;
  border-radius: 5px;
  font-family: "-apple-system";
  color: #f2f2f2;
}
.btn-secondary{
  margin-left: 10px;
  border-radius: 5px;
  font-family: "-apple-system";
  color: #f2f2f2;
}
</style>
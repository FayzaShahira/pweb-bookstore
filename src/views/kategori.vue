<script>
import axios from "axios";
import {ref} from "vue";

const readKategori = 'https://syakiraspace.my.id/fayzashahira/readkategori.php';
const insertKategori = 'https://syakiraspace.my.id/fayzashahira/insertkategori.php';
const deleteKategori = 'https://syakiraspace.my.id/fayzashahira/deletebykodekategori.php';

export default {
  // components: {App},
  data() {
    return {
      datakategori: ref([]),
      InsertKodeKategori: '',
      insertJenisKategori: '',
    }
  },
  mounted() {
    this.readKategori();
    this.insertKategori();
  },
  methods: {
    readKategori() {
      axios.get(readKategori).then((resp) => {
        console.log(resp);
        this.datakategori = resp.data;
      })
          .catch((err) => {
            console.log(err);
          });
    },
    insertKategori(){
      let formData = new FormData();

      formData.append('kode_kategori', this.insertKodeKategori);
      formData.append('jenis_kategori', this.insertJenisKategori);

      axios
          .post(insertKategori, formData, {
            headers: {
              'Content-Type':'multipart/form-data',
            },
      })
          .then ((resp) => {
            console.log(resp.data);
            this.datakategori();
            this.insertKodeKategori='';
            this.insertJenisKategori='';
          })
          .catch((err) => {
            console.log(err);
          });
    },
    delKategori(kode_kategori) {
      if (confirm ('Apakah Anda Ingin Menghapus Data Kategori?')) {
        axios
            .get(deleteKategori +'?kode_kategori=' + kode_kategori)
            .then((resp) => {
              console.log(resp);
              this.readKategori();
            })
            .catch((err) => {
              console.log(err);
            });
      }
    }
  }
}
</script>

<template>
  <tbody>
  <li v-for="(data) in datakategori">
    <td>Kode Kategori: {{data.kode_kategori}}</td> <br>
    <td>Jenis Kategori: {{data.jenis_kategori}}</td>
    <td>
      <router-link
          :to="{ name: 'kategoriUpdate', params: {kode_kategori: data.kode_kategori}}"
          class="btn btn-outline-success"
      >Update</router-link>
      <button type="button" class="btn btn-outline-danger" v-on:click="delKategori(data.kode_kategori)"
      >Delete</button>
    </td>
    <hr>
  </li>
  </tbody>
  <h6>Isi Data Dibawah Jika Ingin Menambahkan Kategori Buku</h6>
  <div class="modal-body">
    <input
        class="form-control"
        type="text"
        v-model="insertKodeKategori"
        placeholder="Kode Kategori"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertJenisKategori"
        placeholder="Jenis Kategori"
        aria-label="default input example" /><br />
  </div>
  <button
      type="button"
      class="btn btn-primary"
      v-on:click="insertKategori()">
    Tambahkan Kategori
  </button>
</template>

<style scoped>
.modal-body{
  margin-top: 30px;
  margin-left: 260px;
  margin-right: 260px;
}
li{
  list-style: none;
  margin-left: 100px;
  font-family: "sans-serif";
  font-size: 18px;
  color: midnightblue;
}
.btn-outline-danger{
  width: 70px;height: 30px;
  font-size: small;
  margin-left: 10px;
  font-weight: bold;
}
.btn-outline-success{
  margin-left: 30px;
  width: 70px;height: 30px;
  font-size: small;
  font-weight: bold;
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
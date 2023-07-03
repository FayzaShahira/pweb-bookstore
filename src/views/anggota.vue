<script>
import axios from "axios";
import {ref} from "vue";
// import App from "@/App.vue";

const readAnggota = 'https://faayshabookstore.000webhostapp.com/moonlitbook/readanggota.php';
const insertAnggota = 'https://faayshabookstore.000webhostapp.com/moonlitbook/insertanggota.php';
const deleteAnggota = 'https://faayshabookstore.000webhostapp.com/moonlitbook/deleteanggota.php';

export default {
  // components: {App},
  data() {
    return {
      daftaranggota: ref([]),
      insertNomor: '',
      insertNama: '',
      insertJenisKelamin: '',
      insertAlamat: '',
      insertNoHp: '',
    }
  },
  mounted() {
    this.readAnggota();
    this.insertAnggota();
  },
  methods: {
    readAnggota() {
      axios.get(readAnggota).then((resp) => {
        console.log(resp);
        this.daftaranggota = resp.data;
      })
          .catch((err) => {
            console.log(err);
          })
    },
    insertAnggota(){
      let formData = new FormData();

      formData.append('nomor', this.insertNomor);
      formData.append('nama', this.insertNama);
      formData.append('jenis_kelamin', this.insertJenisKelamin);
      formData.append('alamat', this.insertAlamat);
      formData.append('no_hp', this.insertNoHp);

      axios
          .post(insertAnggota, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resp) => {
            console.log(resp.data);
            this.readAnggota();
            this.insertNomor= '';
            this.insertNama= '';
            this.insertJenisKelamin= '';
            this.insertAlamat= '';
            this.insertNoHp= '';
          })
          .catch((err) => {
            console.log(err);
          });
    },
    delAnggota(nomor) {
      if (confirm('Apakah Anda Ingin Menghapus Data Anggota?')) {
        axios
            .get(deleteAnggota + '?nomor' + nomor)
            .then((resp) => {
              console.log(resp);
              this.readAnggota();
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
  <li v-for="data in daftaranggota" style="list-style: none">
    <p>Id Anggota: {{data.id_anggota}}</p>
    <p>Nama: {{data.nama}}</p>
    <p>Nomor Keanggotaan: {{data.nomor}}</p>

    <td>
      <router-link
          :to="{ name: 'anggotaUpdate', params: {nomor: data.nomor}}"
          class="btn btn-outline-success"
      >Update</router-link>
      <button type="button" class="btn btn-outline-danger" v-on:click="delAnggota(data.nomor)"
      >Delete</button>
      <hr>
    </td>
  </li>
  <h6>Isi Data Dibawah Jika Ingin Menambahkan Anggota</h6>

  <div class="modal-body">
    <input
        class="form-control"
        type="text"
        v-model="insertNomor"
        placeholder="Nomor Anggota"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertNama"
        placeholder="Nama"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertJenisKelamin"
        placeholder="Jenis Kelamin"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertAlamat"
        placeholder="Alamat"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="number"
        v-model="insertNoHp"
        placeholder="Nomor Handphone"
        aria-label="default input example" /><br />
  </div>

  <button
      type="button"
      class="btn btn-primary"
      v-on:click="insertAnggota()">
    Tambahkan Anggota
  </button>
</template>



<style scoped>
li{
  margin-left: 100px;
  font-family: "sans-serif";
  font-size: 18px;
  color: midnightblue;
}
.modal-body{
  margin-left: 200px;
  margin-right: 200px;
  font-weight: bolder;
  margin-top: 40px;
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
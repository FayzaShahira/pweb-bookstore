<script>
import {RouterLink} from "vue-router";
import axios from "axios";
import {ref} from 'vue';

const updateKategori = 'https://faayshabookstore.000webhostapp.com/moonlitbook/updatebykodekategori.php';
const selectKategori = 'https://faayshabookstore.000webhostapp.com/moonlitbook/selectbykodekategori.php';

export default {
  data() {
    return {
      selectKategori: ref([]),
      updateKodeKategori: '',
      updateJenisKategori: '',
    };
  },
  mounted() {
    this.getKategori();
    this.updateKategori();
  },
  methods: {
    getKategori() {
      axios
          .get(selectKategori + '?kode_kategori=' + this.$route.params.kode_kategori)
          .then((resp) => {
            console.log(resp);
            this.selectKategori = resp.data;
            this.updateKodeKategori = this.selectKategori.kode_kategori;
            this.updateJenisKategori= this.selectKategori.jenis_kategori;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    updateKategori(){
      let formData = new FormData

      formData.append('kode_kategori', this.$route.params.kode_kategori);
      formData.append('jenis_kategori', this.updateJenisKategori);

      axios
          .post(updateKategori, formData, {
            headers: {
              'Content-Type' : 'multipart/form-data',
            },
          })
          .then((resp)=>{
            console.log(resp.data);
            this.getKategori();
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
        v-model="updateKodeKategori"
        placeholder="Kode Kategori"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="updateJenisKategori"
        placeholder="Jenis Kategori"
        aria-label="default input example" /><br />
  </div>

  <button
      type="button"
      class="btn btn-primary"
      v-on:click="updateKategori()">
    Update Kategori
  </button>
  <router-link to="/kategori" class="btn btn-secondary me-5"
  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
  </svg>back</router-link>

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
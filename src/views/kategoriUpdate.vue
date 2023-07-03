<script>
import {RouterLink} from "vue-router";
import axios from "axios";
import {ref} from 'vue';

const updateKategori = 'http://localhost/buku/updatebykodekategori.php';
const selectKategori = 'http://localhost/buku/selectbykodekategori.php';

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
  >back</router-link>

</template>



<style scoped>

</style>
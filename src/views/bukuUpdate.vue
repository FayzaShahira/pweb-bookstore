<script>
import {RouterLink} from "vue-router";
import axios from "axios";
import {ref} from 'vue';
// import App from "@/App.vue";

const updateBuku = 'http://localhost/buku/updatebykodebuku.php';
const selectKodeBuku = 'http://localhost/buku/selectbykodebuku.php';

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
      file: '',
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
            this.file = this.selectBuku.file_cover;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    updateBuku() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData

      formData.append('judul_buku', this.updateJudulBuku);
      formData.append('kode_buku', this.$route.params.kode_buku);
      formData.append('pengarang', this.updatePengarang);
      formData.append('penerbit', this.updatePenerbit);
      formData.append('tahun', this.updateTahunTerbit);
      formData.append('harga', this.updateHarga);
      formData.append('kode_kategori', this.updateKodeKategori);
      formData.append('file_cover', this.file);

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

  <button
      type="button"
      class="btn btn-primary"
      v-on:click="updateBuku()">
    Update Buku
  </button>
  <router-link to="/buku" class="btn btn-secondary me-5"
               >back</router-link>
</template>


<style scoped>

</style>
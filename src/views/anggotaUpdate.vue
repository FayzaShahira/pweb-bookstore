<script>
import {RouterLink} from "vue-router";
import axios from "axios";
import {ref} from 'vue';

const updateAnggota = 'http://localhost/buku/updateanggota.php';
const selectAnggota = 'http://localhost/buku/selectbynomoranggota.php';

export default {
  data() {
    return {
      selectAnggota: ref([]),
      updateNomor: '',
      updateNama: '',
      updateJenisKelamin: '',
      updateAlamat: '',
      updateNoHp: '',
    };
  },
  mounted() {
    this.getAnggota();
    this.updateAnggota();
  },
  methods: {
    getAnggota() {
      axios
          .get(selectAnggota + '?nomor=' + this.$route.params.nomor)
          .then((resp) => {
            console.log(resp);
            this.selectAnggota = resp.data;
            this.updateNomor = this.selectAnggota.nomor;
            this.updateNama = this.selectAnggota.nama;
            this.updateJenisKelamin = this.selectAnggota.jenis_kelamin;
            this.updateAlamat = this.selectAnggota.alamat;
            this.updateNoHp = this.selectAnggota.no_hp;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    updateAnggota() {
      let formData = new FormData

      formData.append('nomor', this.$route.params.nomor);
      formData.append('nama', this.updateNama);
      formData.append('jenis_kelamin', this.updateJenisKelamin);
      formData.append('alamat', this.updateAlamat);
      formData.append('no_hp', this.updateNoHp);

      axios
          .post(updateAnggota, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resp) => {
            console.log(resp.data);
            this.getAnggota();
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
        v-model="updateNomor"
        placeholder="Nomor Anggota"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="updateNama"
        placeholder="Nama"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="updateJenisKelamin"
        placeholder="Jenis Kelamin"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="updateAlamat"
        placeholder="Alamat"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="updateNoHp"
        placeholder="Nomor Handphone"
        aria-label="default input example" /><br />
  </div>

  <button
      type="button"
      class="btn btn-primary"
      v-on:click="updateAnggota()">
    Update Anggota
  </button>
  <router-link to="/anggota" class="btn btn-secondary me-5"
  >back</router-link>
</template>


<style scoped>

</style>
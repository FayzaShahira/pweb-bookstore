<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <ul class="nav nav-pills nav-fill">
      <li class="nav-item">
        <a class="navbar-brand" aria-current="page" href="#"><router-link to = "/">Moonlit</router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><router-link to = "/Buku">Buku</router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><router-link to = "/Kategori">Kategori</router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><router-link to = "/Anggota">Anggota</router-link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><router-link to = "/Peminjaman">Peminjaman</router-link></a>
      </li>
    </ul>
  </nav>

  <hr>
  <p class= "fixed-bottom"> copyright by faaysha </p>


  <RouterView />

</template>

<style scoped>
h1{
  margin-top: 60px;
  margin-left: 100px;
  font-family: "sans-serif";
  font-size: 80px;
  font-weight: bold;
  color: #2c3e50;
  display: flex;
  justify-content: space-between;
}
body{
  background-color: cornflowerblue;
}
nav{
  margin: 10px;
  font-size: 20px;
  font-family: "sans-serif";
  font-weight: bold;
}
.navbar-brand{
  font-size: 25px;
  font-family: "monospace";
  font-weight: bolder;
}

.fixed-bottom{
  text-align: center;
  font-size: 10px;
  font-weight: bold;
}
.navbar-brand{
  margin-right:160px ;
}
</style>

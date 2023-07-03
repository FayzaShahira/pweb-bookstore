import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import bukuUpdate from "@/views/bukuUpdate.vue";
import anggotaUpdate from "@/views/anggotaUpdate.vue";
import kategoriUpdate from "@/views/kategoriUpdate.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/buku',
      name: 'buku',
      component: () => import('../views/buku.vue')
    },
    {
      path: '/anggota',
      name: 'anggota',
      component: () => import('../views/anggota.vue')
    },
    {
      path: '/kategori',
      name: 'kategori',
      component: () => import('../views/kategori.vue')
    },
    {
      path: '/bukuUpdate/:kode_buku',
      name: 'bukuUpdate',
      component: bukuUpdate,
    },
    {
      path : '/anggotaUpdate/:nomor',
      name: 'anggotaUpdate',
      component: anggotaUpdate,
    },
    {
      path : '/kategoriUpdate/:kode_kategori',
      name: 'kategoriUpdate',
      component: kategoriUpdate,
    },
    {
      path: '/peminjaman',
      name: 'peminjaman',
      component: () => import('../views/peminjaman.vue')
    }
  ]
})

export default router

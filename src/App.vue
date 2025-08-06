<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <header class="header">
    <div class="container">
      <RouterLink to="/" class="logo-section">
        <img alt="聯合檢驗雲 Logo" class="logo-img" src="@/assets/logo.png" />
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/" class="nav-link">首頁</RouterLink>
        <RouterLink to="/labs" class="nav-link">檢驗所列表</RouterLink>
        <RouterLink to="/about" class="nav-link">關於我們</RouterLink>
      </nav>
    </div>
  </header>

  <main class="main">
    <RouterView />
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} 聯合檢驗雲. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.header {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s;
}

.logo-section:hover {
  opacity: 0.8;
}

.logo-img {
  height: 45px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #42b883;
}

.main {
  min-height: calc(100vh - 120px);
  padding: 0;
  width: 100%;
}

.footer {
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  padding: 1rem 0;
  text-align: center;
}

.footer p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .logo-img {
    height: 35px;
  }
  
  .nav {
    gap: 1rem;
  }
}
</style>

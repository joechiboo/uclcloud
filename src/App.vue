<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const currentYear = computed(() => new Date().getFullYear())
const showMemberDropdown = ref(false)
</script>

<template>
  <div class="app-wrapper">
    <header class="header">
      <div class="container">
        <RouterLink to="/" class="logo-section">
          <img alt="聯合檢驗雲 Logo" class="logo-img" src="@/assets/logo.png" />
        </RouterLink>
        <nav class="nav">
          <RouterLink to="/" class="nav-link">首頁</RouterLink>
          <RouterLink to="/labs" class="nav-link">檢驗所列表</RouterLink>
          <RouterLink to="/health-assistant" class="nav-link">健康小幫手</RouterLink>
          <div class="dropdown" @mouseenter="showMemberDropdown = true" @mouseleave="showMemberDropdown = false">
            <RouterLink 
              to="/member-center?action=login" 
              :class="['nav-link', 'dropdown-trigger', { active: $route.path === '/member-center' }]"
            >
              會員中心
            </RouterLink>
            <div v-show="showMemberDropdown" class="dropdown-menu">
              <RouterLink to="/member-center?action=login" class="dropdown-item">登入</RouterLink>
              <RouterLink to="/member-center?action=register" class="dropdown-item">註冊</RouterLink>
            </div>
          </div>
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
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
  flex-shrink: 0;
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
  align-items: center;
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

.dropdown {
  position: relative;
}

.dropdown-trigger {
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.dropdown-trigger:hover,
.dropdown-trigger.active,
.dropdown-trigger.router-link-active {
  color: #42b883;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
  min-width: 150px;
  z-index: 1000;
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #666;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #42b883;
}

.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
}

.footer {
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  padding: 1rem 0;
  text-align: center;
  flex-shrink: 0;
  margin-top: auto;
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
    flex-wrap: wrap;
  }
  
  .dropdown-menu {
    left: -50%;
    min-width: 120px;
  }
}
</style>

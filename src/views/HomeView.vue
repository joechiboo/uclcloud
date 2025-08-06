<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLabsStore } from '../stores/labs'

const router = useRouter()
const labsStore = useLabsStore()

const searchKeyword = ref('')
const selectedCity = ref('')
const selectedService = ref('')

const handleSearch = () => {
  let query: any = {}
  
  if (searchKeyword.value) {
    query.keyword = searchKeyword.value
  }
  if (selectedCity.value) {
    query.city = selectedCity.value
  }
  if (selectedService.value) {
    query.service = selectedService.value
  }
  
  router.push({ name: 'labs', query })
}

const handleQuickSearch = (city: string) => {
  selectedCity.value = city
  handleSearch()
}
</script>

<template>
  <div class="home">
    <div class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">聯合檢驗雲</h1>
          <p class="hero-subtitle">快速找到您附近的醫事檢驗所，提供專業、便利的健康檢查服務</p>
          
          <div class="search-form">
            <div class="search-row">
              <div class="search-field">
                <label>關鍵字搜尋</label>
                <input 
                  v-model="searchKeyword" 
                  type="text" 
                  placeholder="輸入檢驗所名稱、地址或關鍵字"
                  @keyup.enter="handleSearch"
                >
              </div>
            </div>
            
            <div class="search-row">
              <div class="search-field">
                <label>選擇地區</label>
                <select v-model="selectedCity">
                  <option value="">全部地區</option>
                  <option v-for="city in labsStore.cities" :key="city" :value="city">
                    {{ city }}
                  </option>
                </select>
              </div>
              
              <div class="search-field">
                <label>檢驗項目</label>
                <select v-model="selectedService">
                  <option value="">全部項目</option>
                  <option v-for="service in labsStore.services" :key="service" :value="service">
                    {{ service }}
                  </option>
                </select>
              </div>
            </div>
            
            <button class="search-button" @click="handleSearch">
              搜尋檢驗所
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="quick-search">
      <div class="container">
        <h2>熱門地區快速搜尋</h2>
        <div class="city-buttons">
          <button 
            v-for="city in labsStore.cities" 
            :key="city" 
            class="city-button"
            @click="handleQuickSearch(city)"
          >
            {{ city }}
          </button>
        </div>
      </div>
    </div>
    
    <div class="features">
      <div class="container">
        <h2>服務特色</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>精準搜尋</h3>
            <p>透過地區、服務項目等條件，快速找到符合需求的檢驗所</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📍</div>
            <h3>地理位置</h3>
            <p>提供詳細地址與聯絡資訊，方便您規劃前往路線</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⏰</div>
            <h3>營業時間</h3>
            <p>清楚顯示各檢驗所營業時間，避免白跑一趟</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🏥</div>
            <h3>專業服務</h3>
            <p>涵蓋各類檢驗項目，滿足不同健康檢查需求</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.hero {
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
  color: white;
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.search-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  color: #333;
}

.search-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-row:last-child {
  margin-bottom: 0;
}

.search-field {
  flex: 1;
}

.search-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

.search-field input,
.search-field select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-field input:focus,
.search-field select:focus {
  outline: none;
  border-color: #42b883;
}

.search-button {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-top: 1rem;
}

.search-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(66, 184, 131, 0.4);
}

.quick-search {
  padding: 3rem 0;
  background: #f8f9fa;
}

.quick-search h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.city-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.city-button {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.city-button:hover {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.features {
  padding: 4rem 0;
}

.features h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  font-size: 2.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.3rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .search-row {
    flex-direction: column;
  }
  
  .city-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>

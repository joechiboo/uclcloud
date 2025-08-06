<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLabsStore } from '../stores/labs'
import type { Lab } from '../stores/labs'

const route = useRoute()
const router = useRouter()
const labsStore = useLabsStore()

const searchKeyword = ref('')
const selectedCity = ref('')
const selectedService = ref('')
const filteredLabs = ref<Lab[]>([])

onMounted(() => {
  searchKeyword.value = (route.query.keyword as string) || ''
  selectedCity.value = (route.query.city as string) || ''
  selectedService.value = (route.query.service as string) || ''
  
  performSearch()
})

const performSearch = () => {
  let results = [...labsStore.labs]
  
  if (searchKeyword.value) {
    results = labsStore.searchLabs(searchKeyword.value)
  }
  
  if (selectedCity.value) {
    results = results.filter(lab => lab.city === selectedCity.value)
  }
  
  if (selectedService.value) {
    results = results.filter(lab => lab.services.includes(selectedService.value))
  }
  
  filteredLabs.value = results
}

const handleSearch = () => {
  performSearch()
  
  let query: any = {}
  if (searchKeyword.value) query.keyword = searchKeyword.value
  if (selectedCity.value) query.city = selectedCity.value
  if (selectedService.value) query.service = selectedService.value
  
  router.replace({ name: 'labs', query })
}

const clearFilters = () => {
  searchKeyword.value = ''
  selectedCity.value = ''
  selectedService.value = ''
  handleSearch()
}

const goToDetail = (id: number) => {
  router.push({ name: 'lab-detail', params: { id: id.toString() } })
}
</script>

<template>
  <div class="lab-list">
    <div class="container">
      <div class="search-section">
        <h1>聯合檢驗雲 - 檢驗所搜尋結果</h1>
        
        <div class="search-form">
          <div class="search-row">
            <div class="search-field">
              <input 
                v-model="searchKeyword" 
                type="text" 
                placeholder="輸入檢驗所名稱、地址或關鍵字"
                @keyup.enter="handleSearch"
              >
            </div>
            <div class="search-field">
              <select v-model="selectedCity" @change="handleSearch">
                <option value="">全部地區</option>
                <option v-for="city in labsStore.cities" :key="city" :value="city">
                  {{ city }}
                </option>
              </select>
            </div>
            <div class="search-field">
              <select v-model="selectedService" @change="handleSearch">
                <option value="">全部項目</option>
                <option v-for="service in labsStore.services" :key="service" :value="service">
                  {{ service }}
                </option>
              </select>
            </div>
            <button class="search-button" @click="handleSearch">搜尋</button>
            <button class="clear-button" @click="clearFilters">清除</button>
          </div>
        </div>
      </div>
      
      <div class="results-section">
        <div class="results-header">
          <h2>找到 {{ filteredLabs.length }} 家檢驗所</h2>
        </div>
        
        <div v-if="filteredLabs.length === 0" class="no-results">
          <div class="no-results-icon">🔍</div>
          <h3>沒有找到符合條件的檢驗所</h3>
          <p>請嘗試調整搜尋條件或清除篩選器</p>
          <button class="clear-button" @click="clearFilters">清除所有篩選</button>
        </div>
        
        <div v-else class="labs-grid">
          <div 
            v-for="lab in filteredLabs" 
            :key="lab.id" 
            class="lab-card"
            @click="goToDetail(lab.id)"
          >
            <div class="lab-header">
              <h3>{{ lab.name }}</h3>
              <div class="lab-location">
                <span class="city">{{ lab.city }}</span>
                <span class="district">{{ lab.district }}</span>
              </div>
            </div>
            
            <div class="lab-info">
              <div class="info-item">
                <span class="icon">📍</span>
                <span class="text">{{ lab.address }}</span>
              </div>
              
              <div class="info-item">
                <span class="icon">📞</span>
                <span class="text">{{ lab.phone }}</span>
              </div>
              
              <div class="info-item" v-if="lab.email">
                <span class="icon">✉️</span>
                <span class="text">{{ lab.email }}</span>
              </div>
            </div>
            
            <div class="lab-services">
              <h4>檢驗項目</h4>
              <div class="services-tags">
                <span 
                  v-for="service in lab.services.slice(0, 3)" 
                  :key="service" 
                  class="service-tag"
                >
                  {{ service }}
                </span>
                <span v-if="lab.services.length > 3" class="more-services">
                  +{{ lab.services.length - 3 }}更多
                </span>
              </div>
            </div>
            
            <div class="lab-hours">
              <span class="hours-label">營業時間：</span>
              <span class="hours-text">{{ lab.openHours.monday }}</span>
            </div>
            
            <div class="lab-actions">
              <button class="detail-button">查看詳情</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lab-list {
  flex-grow: 1;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.search-section {
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.search-section h1 {
  margin-bottom: 1.5rem;
  color: #333;
}

.search-form {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.search-row {
  display: flex;
  gap: 1rem;
  align-items: end;
}

.search-field {
  flex: 1;
}

.search-field input,
.search-field select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
}

.search-field input:focus,
.search-field select:focus {
  outline: none;
  border-color: #667eea;
}

.search-button,
.clear-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.search-button {
  background: #667eea;
  color: white;
}

.search-button:hover {
  background: #5a6fd8;
}

.clear-button {
  background: #6c757d;
  color: white;
}

.clear-button:hover {
  background: #5a6268;
}

.results-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.results-header h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.no-results {
  text-align: center;
  padding: 3rem 0;
  color: #666;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.labs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.lab-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.lab-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.lab-header {
  margin-bottom: 1rem;
}

.lab-header h3 {
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1.3rem;
}

.lab-location {
  display: flex;
  gap: 0.5rem;
}

.city,
.district {
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #666;
}

.lab-info {
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.info-item .icon {
  width: 20px;
}

.lab-services {
  margin-bottom: 1rem;
}

.lab-services h4 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
}

.services-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-tag {
  background: #e8f2ff;
  color: #667eea;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.more-services {
  background: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.lab-hours {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.hours-label {
  font-weight: 600;
}

.lab-actions {
  display: flex;
  justify-content: flex-end;
}

.detail-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;
}

.detail-button:hover {
  background: #5a6fd8;
}

@media (max-width: 768px) {
  .search-row {
    flex-direction: column;
  }
  
  .labs-grid {
    grid-template-columns: 1fr;
  }
  
  .search-section,
  .results-section {
    padding: 1rem;
  }
}
</style>
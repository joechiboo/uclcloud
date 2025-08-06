<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLabsStore } from '../stores/labs'
import type { Lab } from '../stores/labs'

const route = useRoute()
const router = useRouter()
const labsStore = useLabsStore()

const lab = ref<Lab | null>(null)
const loading = ref(true)

onMounted(() => {
  const labId = parseInt(route.params.id as string)
  lab.value = labsStore.getLabById(labId) || null
  loading.value = false
  
  if (!lab.value) {
    router.push('/labs')
  }
})

const goBack = () => {
  router.go(-1)
}

const getOpenHoursArray = computed(() => {
  if (!lab.value) return []
  
  const days = [
    { key: 'monday', name: '週一' },
    { key: 'tuesday', name: '週二' },
    { key: 'wednesday', name: '週三' },
    { key: 'thursday', name: '週四' },
    { key: 'friday', name: '週五' },
    { key: 'saturday', name: '週六' },
    { key: 'sunday', name: '週日' }
  ]
  
  return days.map(day => ({
    name: day.name,
    hours: lab.value!.openHours[day.key as keyof typeof lab.value.openHours]
  }))
})

const callPhone = () => {
  if (lab.value?.phone) {
    window.open(`tel:${lab.value.phone}`)
  }
}

const sendEmail = () => {
  if (lab.value?.email) {
    window.open(`mailto:${lab.value.email}`)
  }
}

const openWebsite = () => {
  if (lab.value?.website) {
    window.open(lab.value.website, '_blank')
  }
}

const openMap = () => {
  if (lab.value?.address) {
    const encodedAddress = encodeURIComponent(lab.value.address)
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank')
  }
}
</script>

<template>
  <div class="lab-detail">
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>載入中...</p>
    </div>
    
    <div v-else-if="!lab" class="not-found">
      <div class="not-found-icon">😕</div>
      <h2>檢驗所不存在</h2>
      <p>您要查看的檢驗所不存在或已被移除</p>
      <button class="back-button" @click="goBack">返回</button>
    </div>
    
    <div v-else class="container">
      <div class="breadcrumb">
        <button class="back-button" @click="goBack">
          <span class="back-icon">←</span>
          <span class="back-text">返回</span>
        </button>
      </div>
      
      <div class="lab-header">
        <div class="header-content">
          <h1>{{ lab.name }}</h1>
          <div class="lab-location">
            <span class="city">{{ lab.city }}</span>
            <span class="district">{{ lab.district }}</span>
          </div>
          <p class="lab-description">{{ lab.description }}</p>
        </div>
      </div>
      
      <div class="lab-content">
        <div class="main-content">
          <div class="photos-section">
            <h2>檢驗所環境</h2>
            <div class="photos-grid">
              <div class="photo-card">
                <div class="photo-placeholder">
                  <span class="photo-icon">🏥</span>
                  <p>外觀環境</p>
                </div>
              </div>
              <div class="photo-card">
                <div class="photo-placeholder">
                  <span class="photo-icon">🔬</span>
                  <p>檢驗設備</p>
                </div>
              </div>
              <div class="photo-card">
                <div class="photo-placeholder">
                  <span class="photo-icon">🪑</span>
                  <p>候診區域</p>
                </div>
              </div>
              <div class="photo-card">
                <div class="photo-placeholder">
                  <span class="photo-icon">👨‍⚕️</span>
                  <p>專業團隊</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="info-section">
            <h2>聯絡資訊</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-icon">📍</div>
                <div class="info-content">
                  <h3>地址</h3>
                  <p>{{ lab.address }}</p>
                  <button class="action-button" @click="openMap">在地圖中查看</button>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">📞</div>
                <div class="info-content">
                  <h3>電話</h3>
                  <p>{{ lab.phone }}</p>
                  <button class="action-button" @click="callPhone">撥打電話</button>
                </div>
              </div>
              
              <div class="info-item" v-if="lab.email">
                <div class="info-icon">✉️</div>
                <div class="info-content">
                  <h3>電子郵件</h3>
                  <p>{{ lab.email }}</p>
                  <button class="action-button" @click="sendEmail">發送郵件</button>
                </div>
              </div>
              
              <div class="info-item" v-if="lab.website">
                <div class="info-icon">🌐</div>
                <div class="info-content">
                  <h3>官方網站</h3>
                  <p>{{ lab.website }}</p>
                  <button class="action-button" @click="openWebsite">前往網站</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="services-section">
            <h2>檢驗項目</h2>
            <div class="services-grid">
              <div 
                v-for="service in lab.services" 
                :key="service" 
                class="service-card"
              >
                <div class="service-icon">🔬</div>
                <h3>{{ service }}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div class="sidebar">
          <div class="hours-section">
            <h2>營業時間</h2>
            <div class="hours-list">
              <div 
                v-for="day in getOpenHoursArray" 
                :key="day.name" 
                class="hours-item"
                :class="{ 'closed': day.hours === '休息' }"
              >
                <span class="day">{{ day.name }}</span>
                <span class="hours">{{ day.hours }}</span>
              </div>
            </div>
          </div>
          
          <div class="quick-actions">
            <h2>快速操作</h2>
            <div class="actions-list">
              <button class="quick-action-button phone" @click="callPhone">
                <span class="action-icon">📞</span>
                <span>立即致電</span>
              </button>
              
              <button class="quick-action-button map" @click="openMap">
                <span class="action-icon">📍</span>
                <span>查看地圖</span>
              </button>
              
              <button 
                v-if="lab.email" 
                class="quick-action-button email" 
                @click="sendEmail"
              >
                <span class="action-icon">✉️</span>
                <span>發送郵件</span>
              </button>
              
              <button 
                v-if="lab.website" 
                class="quick-action-button website" 
                @click="openWebsite"
              >
                <span class="action-icon">🌐</span>
                <span>官方網站</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lab-detail {
  flex-grow: 1;
  background: #f8f9fa;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  color: #666;
}

.not-found-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.breadcrumb {
  margin-bottom: 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  color: #42b883;
  cursor: pointer;
  font-size: 0.95rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.back-button:hover {
  background: #42b883;
  color: white;
  border-color: #42b883;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(66, 184, 131, 0.2);
}

.back-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.back-button:hover .back-icon {
  transform: translateX(-2px);
}

.back-text {
  font-family: inherit;
}

.lab-header {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.lab-header h1 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.lab-location {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.city,
.district {
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #666;
}

.lab-description {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
}

.lab-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.photos-section,
.info-section,
.services-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.photos-section h2,
.info-section h2,
.services-section h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.photo-card {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}

.photo-card:hover {
  transform: translateY(-2px);
}

.photo-placeholder {
  background: #f8f9fa;
  border: 2px dashed #e0e0e0;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
  transition: all 0.3s;
}

.photo-placeholder:hover {
  background: #f0f0f0;
  border-color: #42b883;
}

.photo-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.photo-placeholder p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
}


.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.info-icon {
  font-size: 1.5rem;
  width: 40px;
  text-align: center;
}

.info-content h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.info-content p {
  margin-bottom: 1rem;
  color: #666;
  word-break: break-all;
}

.action-button {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;
}

.action-button:hover {
  background: #369870;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.service-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.service-icon {
  font-size: 1.25rem;
}

.service-card h3 {
  color: #333;
  font-size: 1rem;
  margin: 0;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hours-section,
.quick-actions {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.hours-section h2,
.quick-actions h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.hours-item:last-child {
  border-bottom: none;
}

.hours-item.closed .hours {
  color: #dc3545;
  font-weight: 600;
}

.day {
  font-weight: 500;
  color: #333;
}

.hours {
  color: #666;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quick-action-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  text-align: left;
}

.quick-action-button.phone {
  background: #28a745;
  color: white;
}

.quick-action-button.phone:hover {
  background: #218838;
}

.quick-action-button.map {
  background: #17a2b8;
  color: white;
}

.quick-action-button.map:hover {
  background: #138496;
}

.quick-action-button.email {
  background: #ffc107;
  color: #212529;
}

.quick-action-button.email:hover {
  background: #e0a800;
}

.quick-action-button.website {
  background: #6f42c1;
  color: white;
}

.quick-action-button.website:hover {
  background: #5a32a3;
}

.action-icon {
  font-size: 1.25rem;
}

@media (max-width: 968px) {
  .lab-content {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .lab-header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .lab-header,
  .info-section,
  .services-section,
  .hours-section,
  .quick-actions {
    padding: 1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
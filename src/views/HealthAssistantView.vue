<template>
  <div class="health-assistant">
    <div class="container">
      <h1>健康小幫手</h1>
      <div class="measurement-grid">
        <!-- Blood Pressure Card -->
        <div class="measurement-card">
          <h3>血壓測量</h3>
          <div class="measurement-form">
            <div class="input-group">
              <label>收縮壓 (mmHg)</label>
              <input
                type="number"
                v-model="bloodPressure.systolic"
                placeholder="120"
                min="60"
                max="250"
              />
            </div>
            <div class="input-group">
              <label>舒張壓 (mmHg)</label>
              <input
                type="number"
                v-model="bloodPressure.diastolic"
                placeholder="80"
                min="40"
                max="150"
              />
            </div>
            <div class="input-group">
              <label>心率 (次/分鐘)</label>
              <input
                type="number"
                v-model="bloodPressure.heartRate"
                placeholder="72"
                min="30"
                max="220"
              />
            </div>
            <button @click="saveBloodPressure" class="save-btn">記錄血壓</button>
          </div>
        </div>

        <!-- Blood Sugar Card -->
        <div class="measurement-card">
          <h3>血糖測量</h3>
          <div class="measurement-form">
            <div class="input-group">
              <label>血糖值 (mg/dL)</label>
              <input
                type="number"
                v-model="bloodSugar.value"
                placeholder="100"
                min="20"
                max="500"
              />
            </div>
            <div class="input-group">
              <label>三酸甘油脂 (mg/dL)</label>
              <input
                type="number"
                v-model="bloodSugar.triglycerides"
                placeholder="150"
                min="30"
                max="1000"
              />
            </div>
            <p class="measurement-note">※ 測量時請空腹</p>
            <button @click="saveBloodSugar" class="save-btn">記錄血糖</button>
          </div>
        </div>

        <!-- Physiological Measurements Card -->
        <div class="measurement-card">
          <h3>生理測量</h3>
          <div class="measurement-form">
            <div class="input-group">
              <label>體重 (kg)</label>
              <input
                type="number"
                v-model="physiological.weight"
                placeholder="65"
                min="20"
                max="300"
                step="0.1"
              />
            </div>
            <div class="input-group">
              <label>身高 (cm)</label>
              <input
                type="number"
                v-model="physiological.height"
                placeholder="170"
                min="100"
                max="250"
              />
            </div>
            <div class="input-group">
              <label>腰圍 (cm)</label>
              <input
                type="number"
                v-model="physiological.waist"
                placeholder="80"
                min="50"
                max="200"
              />
            </div>
            <div class="input-group">
              <label>體溫 (°C)</label>
              <input
                type="number"
                v-model="physiological.temperature"
                placeholder="36.5"
                min="30"
                max="45"
                step="0.1"
              />
            </div>
            <button @click="savePhysiological" class="save-btn">記錄生理數據</button>
          </div>
        </div>

      </div>

      <!-- BMI Calculator -->
      <div class="bmi-section" v-if="physiological.weight && physiological.height">
        <h3>BMI 計算結果</h3>
        <div class="bmi-result">
          <span class="bmi-value">{{ bmiValue }}</span>
          <span class="bmi-category" :class="bmiCategoryClass">{{ bmiCategory }}</span>
        </div>
      </div>

      <!-- Recent Records -->
      <div class="records-section">
        <h3>最近記錄</h3>
        <div class="records-grid">
          <div v-for="record in recentRecords" :key="record.id" class="record-item">
            <div class="record-type">{{ record.type }}</div>
            <div class="record-value">{{ record.value }}</div>
            <div class="record-date">{{ formatDate(record.date) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// Reactive data
const bloodPressure = reactive({
  systolic: null as number | null,
  diastolic: null as number | null,
  heartRate: null as number | null
})

const bloodSugar = reactive({
  value: null as number | null,
  triglycerides: null as number | null
})

const physiological = reactive({
  weight: null as number | null,
  height: null as number | null,
  waist: null as number | null,
  temperature: null as number | null
})


const recentRecords = ref([
  { id: 1, type: '血壓', value: '120/80 mmHg', date: new Date() },
  { id: 2, type: '血糖', value: '95 mg/dL', date: new Date() },
  { id: 3, type: '體重', value: '65.5 kg', date: new Date() }
])

// Computed properties
const bmiValue = computed(() => {
  if (physiological.weight && physiological.height) {
    const heightInMeters = physiological.height / 100
    const bmi = physiological.weight / (heightInMeters * heightInMeters)
    return bmi.toFixed(1)
  }
  return '0.0'
})

const bmiCategory = computed(() => {
  const bmi = parseFloat(bmiValue.value)
  if (bmi < 18.5) return '體重過輕'
  if (bmi < 24) return '正常體重'
  if (bmi < 27) return '過重'
  if (bmi < 30) return '輕度肥胖'
  if (bmi < 35) return '中度肥胖'
  return '重度肥胖'
})

const bmiCategoryClass = computed(() => {
  const bmi = parseFloat(bmiValue.value)
  if (bmi < 18.5) return 'underweight'
  if (bmi < 24) return 'normal'
  if (bmi < 27) return 'overweight'
  return 'obese'
})

// Validation functions
const validateBloodPressure = (systolic: number, diastolic: number): string | null => {
  if (systolic < 60 || systolic > 250) {
    return '收縮壓應在60-250 mmHg之間'
  }
  if (diastolic < 40 || diastolic > 150) {
    return '舒張壓應在40-150 mmHg之間'
  }
  if (systolic <= diastolic) {
    return '收縮壓應高於舒張壓'
  }
  return null
}

const validateBloodSugar = (value: number): string | null => {
  if (value < 20 || value > 500) {
    return '血糖值應在20-500 mg/dL之間'
  }
  return null
}

const validateTriglycerides = (value: number): string | null => {
  if (value < 30 || value > 1000) {
    return '三酸甘油脂應在30-1000 mg/dL之間'
  }
  return null
}

const validateHeartRate = (value: number): string | null => {
  if (value < 30 || value > 220) {
    return '心率應在30-220次/分鐘之間'
  }
  return null
}

const validatePhysiological = (weight?: number | null, height?: number | null, waist?: number | null, temperature?: number | null): string | null => {
  if (weight && (weight < 20 || weight > 300)) {
    return '體重應在20-300公斤之間'
  }
  if (height && (height < 100 || height > 250)) {
    return '身高應在100-250公分之間'
  }
  if (waist && (waist < 50 || waist > 200)) {
    return '腰圍應在50-200公分之間'
  }
  if (temperature && (temperature < 30 || temperature > 45)) {
    return '體溫應在30-45°C之間'
  }
  return null
}

// Methods
const saveBloodPressure = () => {
  if (!bloodPressure.systolic || !bloodPressure.diastolic) {
    alert('請輸入完整的血壓數值')
    return
  }

  const validationError = validateBloodPressure(bloodPressure.systolic, bloodPressure.diastolic)
  if (validationError) {
    alert(validationError)
    return
  }

  if (bloodPressure.heartRate) {
    const heartRateError = validateHeartRate(bloodPressure.heartRate)
    if (heartRateError) {
      alert(heartRateError)
      return
    }
  }

  let recordValue = `${bloodPressure.systolic}/${bloodPressure.diastolic} mmHg`
  if (bloodPressure.heartRate) {
    recordValue += `, 心率: ${bloodPressure.heartRate} 次/分鐘`
  }

  const record = {
    id: Date.now(),
    type: '血壓',
    value: recordValue,
    date: new Date()
  }
  recentRecords.value.unshift(record)
  recentRecords.value = recentRecords.value.slice(0, 10) // Keep only last 10 records
  alert('血壓記錄已保存！')
  bloodPressure.systolic = null
  bloodPressure.diastolic = null
  bloodPressure.heartRate = null
}

const saveBloodSugar = () => {
  if (!bloodSugar.value) {
    alert('請輸入血糖數值')
    return
  }

  const bloodSugarError = validateBloodSugar(bloodSugar.value)
  if (bloodSugarError) {
    alert(bloodSugarError)
    return
  }

  if (bloodSugar.triglycerides) {
    const triglyceridesError = validateTriglycerides(bloodSugar.triglycerides)
    if (triglyceridesError) {
      alert(triglyceridesError)
      return
    }
  }

  let recordValue = `血糖: ${bloodSugar.value} mg/dL`
  if (bloodSugar.triglycerides) {
    recordValue += `, 三酸甘油脂: ${bloodSugar.triglycerides} mg/dL`
  }
  recordValue += ` (空腹)`

  const record = {
    id: Date.now(),
    type: '血糖',
    value: recordValue,
    date: new Date()
  }
  recentRecords.value.unshift(record)
  recentRecords.value = recentRecords.value.slice(0, 10)
  alert('血糖記錄已保存！')
  bloodSugar.value = null
  bloodSugar.triglycerides = null
}

const savePhysiological = () => {
  const validationError = validatePhysiological(
    physiological.weight, 
    physiological.height, 
    physiological.waist, 
    physiological.temperature
  )
  if (validationError) {
    alert(validationError)
    return
  }

  const measurements = []
  if (physiological.weight) measurements.push(`體重: ${physiological.weight} kg`)
  if (physiological.height) measurements.push(`身高: ${physiological.height} cm`)
  if (physiological.waist) measurements.push(`腰圍: ${physiological.waist} cm`)
  if (physiological.temperature) measurements.push(`體溫: ${physiological.temperature}°C`)
  
  if (measurements.length > 0) {
    const record = {
      id: Date.now(),
      type: '生理測量',
      value: measurements.join(', '),
      date: new Date()
    }
    recentRecords.value.unshift(record)
    recentRecords.value = recentRecords.value.slice(0, 10)
    alert('生理測量記錄已保存！')
    physiological.weight = null
    physiological.height = null
    physiological.waist = null
    physiological.temperature = null
  } else {
    alert('請至少輸入一項生理測量數據')
  }
}




const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-TW') + ' ' + date.toLocaleTimeString('zh-TW', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
.health-assistant {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.measurement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.measurement-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.measurement-card:hover {
  transform: translateY(-2px);
}

.measurement-card h3 {
  color: #42b883;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  border-bottom: 2px solid #42b883;
  padding-bottom: 0.5rem;
}

.measurement-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-weight: 500;
  color: #555;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.input-group input,
.input-group select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
  border-color: #42b883;
}

.save-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;
}

.save-btn:hover {
  background: #369870;
}

.measurement-note {
  font-size: 0.85rem;
  color: #e74c3c;
  margin: 0.5rem 0;
  font-style: italic;
  text-align: center;
  background: #ffeaa7;
  padding: 0.5rem;
  border-radius: 4px;
  border-left: 3px solid #e74c3c;
}

.bmi-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
  text-align: center;
}

.bmi-section h3 {
  color: #333;
  margin-bottom: 1rem;
}

.bmi-result {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.bmi-value {
  font-size: 2rem;
  font-weight: bold;
  color: #42b883;
}

.bmi-category {
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.bmi-category.normal {
  background: #d4edda;
  color: #155724;
}

.bmi-category.underweight {
  background: #fff3cd;
  color: #856404;
}

.bmi-category.overweight {
  background: #ffeaa7;
  color: #856404;
}

.bmi-category.obese {
  background: #f8d7da;
  color: #721c24;
}

.records-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.records-section h3 {
  color: #333;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.records-grid {
  display: grid;
  gap: 1rem;
}

.record-item {
  display: grid;
  grid-template-columns: 100px 1fr 150px;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  align-items: center;
}

.record-type {
  font-weight: 500;
  color: #42b883;
}

.record-value {
  color: #333;
}

.record-date {
  color: #666;
  font-size: 0.9rem;
  text-align: right;
}

@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .measurement-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .measurement-card {
    padding: 1.5rem;
  }
  
  .record-item {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .record-date {
    text-align: center;
  }
  
  .bmi-result {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
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
          </div>
        </div>

      </div>

      <!-- Complete Health Analysis -->
      <div class="health-analysis-section" v-if="hasAnyData">
        <h3>健康分析報告</h3>
        
        <!-- BMI Analysis -->
        <div class="analysis-card" v-if="physiological.weight && physiological.height">
          <h4>🏃‍♂️ BMI 身體質量指數</h4>
          <div class="analysis-content">
            <div class="main-value">
              <span class="value">{{ bmiValue }}</span>
              <span class="category" :class="bmiCategoryClass">{{ bmiCategory }}</span>
            </div>
            <div class="analysis-text">{{ bmiAnalysis }}</div>
            <div class="recommendation">{{ bmiRecommendation }}</div>
          </div>
        </div>

        <!-- Blood Pressure Analysis -->
        <div class="analysis-card" v-if="bloodPressure.systolic && bloodPressure.diastolic">
          <h4>❤️ 血壓狀況</h4>
          <div class="analysis-content">
            <div class="main-value">
              <span class="value">{{ bloodPressure.systolic }}/{{ bloodPressure.diastolic }}</span>
              <span class="unit">mmHg</span>
              <span class="category" :class="bloodPressureCategoryClass">{{ bloodPressureCategory }}</span>
            </div>
            <div class="analysis-text">{{ bloodPressureAnalysis }}</div>
            <div class="recommendation">{{ bloodPressureRecommendation }}</div>
          </div>
        </div>

        <!-- Blood Sugar Analysis -->
        <div class="analysis-card" v-if="bloodSugar.value">
          <h4>🩸 血糖狀況</h4>
          <div class="analysis-content">
            <div class="main-value">
              <span class="value">{{ bloodSugar.value }}</span>
              <span class="unit">mg/dL</span>
              <span class="category" :class="bloodSugarCategoryClass">{{ bloodSugarCategory }}</span>
            </div>
            <div class="analysis-text">{{ bloodSugarAnalysis }}</div>
            <div class="recommendation">{{ bloodSugarRecommendation }}</div>
          </div>
        </div>

        <!-- Triglycerides Analysis -->
        <div class="analysis-card" v-if="bloodSugar.triglycerides">
          <h4>🧪 三酸甘油脂</h4>
          <div class="analysis-content">
            <div class="main-value">
              <span class="value">{{ bloodSugar.triglycerides }}</span>
              <span class="unit">mg/dL</span>
              <span class="category" :class="triglyceridesCategoryClass">{{ triglyceridesCategory }}</span>
            </div>
            <div class="analysis-text">{{ triglyceridesAnalysis }}</div>
            <div class="recommendation">{{ triglyceridesRecommendation }}</div>
          </div>
        </div>

        <!-- Heart Rate Analysis -->
        <div class="analysis-card" v-if="bloodPressure.heartRate">
          <h4>💗 心率狀況</h4>
          <div class="analysis-content">
            <div class="main-value">
              <span class="value">{{ bloodPressure.heartRate }}</span>
              <span class="unit">次/分鐘</span>
              <span class="category" :class="heartRateCategoryClass">{{ heartRateCategory }}</span>
            </div>
            <div class="analysis-text">{{ heartRateAnalysis }}</div>
            <div class="recommendation">{{ heartRateRecommendation }}</div>
          </div>
        </div>

        <!-- Waist Circumference Analysis -->
        <div class="analysis-card" v-if="physiological.waist">
          <h4>📏 腰圍評估</h4>
          <div class="analysis-content">
            <div class="main-value">
              <span class="value">{{ physiological.waist }}</span>
              <span class="unit">cm</span>
              <span class="category" :class="waistCategoryClass">{{ waistCategory }}</span>
            </div>
            <div class="analysis-text">{{ waistAnalysis }}</div>
            <div class="recommendation">{{ waistRecommendation }}</div>
          </div>
        </div>

        <!-- Body Temperature Analysis -->
        <div class="analysis-card" v-if="physiological.temperature">
          <h4>🌡️ 體溫狀況</h4>
          <div class="analysis-content">
            <div class="main-value">
              <span class="value">{{ physiological.temperature }}</span>
              <span class="unit">°C</span>
              <span class="category" :class="temperatureCategoryClass">{{ temperatureCategory }}</span>
            </div>
            <div class="analysis-text">{{ temperatureAnalysis }}</div>
            <div class="recommendation">{{ temperatureRecommendation }}</div>
          </div>
        </div>

        <!-- Overall Health Score -->
        <div class="health-score-card" v-if="overallHealthScore > 0">
          <h4>🎯 綜合健康評分</h4>
          <div class="score-content">
            <div class="score-circle">
              <div class="score-value">{{ overallHealthScore }}/100</div>
              <div class="score-label">健康指數</div>
            </div>
            <div class="score-analysis">
              <div class="score-category" :class="healthScoreCategoryClass">{{ healthScoreCategory }}</div>
              <div class="score-text">{{ healthScoreAnalysis }}</div>
            </div>
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



// Computed properties
const hasAnyData = computed(() => {
  return (physiological.weight && physiological.height) || 
         (bloodPressure.systolic && bloodPressure.diastolic) ||
         bloodSugar.value ||
         bloodSugar.triglycerides ||
         bloodPressure.heartRate ||
         physiological.waist ||
         physiological.temperature
})

// BMI Calculations
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

const bmiAnalysis = computed(() => {
  const bmi = parseFloat(bmiValue.value)
  if (bmi < 18.5) return '您的體重偏輕，可能需要增加營養攝取和適當運動來增加健康體重。'
  if (bmi < 24) return '恭喜！您的體重在健康範圍內，請保持良好的飲食和運動習慣。'
  if (bmi < 27) return '您的體重稍微過重，建議調整飲食習慣並增加運動量。'
  if (bmi < 30) return '您已達到輕度肥胖，建議尋求專業營養師協助制定減重計畫。'
  if (bmi < 35) return '您已達到中度肥胖，強烈建議諮詢醫師並制定完整的健康管理計畫。'
  return '您已達到重度肥胖，請立即諮詢醫療專業人員，進行全面健康評估。'
})

const bmiRecommendation = computed(() => {
  const bmi = parseFloat(bmiValue.value)
  if (bmi < 18.5) return '建議：增加蛋白質攝取、規律進食、適度重量訓練'
  if (bmi < 24) return '建議：維持均衡飲食、規律運動、充足睡眠'
  if (bmi < 27) return '建議：控制熱量攝取、增加有氧運動、避免高糖食物'
  if (bmi < 30) return '建議：尋求營養師協助、每週運動150分鐘、監控體重變化'
  if (bmi < 35) return '建議：醫師諮詢、專業飲食計畫、循序漸進運動'
  return '建議：立即醫療評估、可能需要醫療介入、專業團隊協助'
})

// Blood Pressure Analysis
const bloodPressureCategory = computed(() => {
  if (!bloodPressure.systolic || !bloodPressure.diastolic) return ''
  const sys = bloodPressure.systolic
  const dia = bloodPressure.diastolic
  
  if (sys < 120 && dia < 80) return '正常血壓'
  if ((sys >= 120 && sys <= 129) && dia < 80) return '血壓偏高'
  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return '第一期高血壓'
  if (sys >= 140 || dia >= 90) return '第二期高血壓'
  if (sys >= 180 || dia >= 120) return '高血壓危機'
  return '需要評估'
})

const bloodPressureCategoryClass = computed(() => {
  if (!bloodPressure.systolic || !bloodPressure.diastolic) return ''
  const sys = bloodPressure.systolic
  const dia = bloodPressure.diastolic
  
  if (sys < 120 && dia < 80) return 'normal'
  if ((sys >= 120 && sys <= 129) && dia < 80) return 'elevated'
  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return 'stage1'
  if (sys >= 140 || dia >= 90) return 'stage2'
  if (sys >= 180 || dia >= 120) return 'crisis'
  return 'unknown'
})

const bloodPressureAnalysis = computed(() => {
  if (!bloodPressure.systolic || !bloodPressure.diastolic) return ''
  const category = bloodPressureCategoryClass.value
  
  switch (category) {
    case 'normal': return '您的血壓在正常範圍內，這是維持心血管健康的重要指標。'
    case 'elevated': return '您的血壓稍微偏高，建議開始注意生活習慣的調整。'
    case 'stage1': return '您已達到第一期高血壓，建議開始積極的生活方式干預。'
    case 'stage2': return '您已達到第二期高血壓，強烈建議尋求醫療協助。'
    case 'crisis': return '您的血壓達到危險水平，請立即就醫！'
    default: return ''
  }
})

const bloodPressureRecommendation = computed(() => {
  if (!bloodPressure.systolic || !bloodPressure.diastolic) return ''
  const category = bloodPressureCategoryClass.value
  
  switch (category) {
    case 'normal': return '建議：維持低鹽飲食、規律運動、控制體重'
    case 'elevated': return '建議：減少鈉攝取、增加運動、管理壓力'
    case 'stage1': return '建議：醫師評估、DASH飲食、每日有氧運動'
    case 'stage2': return '建議：立即醫療評估、可能需要藥物治療'
    case 'crisis': return '建議：緊急就醫、避免劇烈活動、密切監控'
    default: return ''
  }
})

// Blood Sugar Analysis
const bloodSugarCategory = computed(() => {
  if (!bloodSugar.value) return ''
  const bs = bloodSugar.value
  
  if (bs < 70) return '低血糖'
  if (bs >= 70 && bs < 100) return '正常血糖'
  if (bs >= 100 && bs < 126) return '糖尿病前期'
  if (bs >= 126) return '糖尿病範圍'
  return ''
})

const bloodSugarCategoryClass = computed(() => {
  if (!bloodSugar.value) return ''
  const bs = bloodSugar.value
  
  if (bs < 70) return 'low'
  if (bs >= 70 && bs < 100) return 'normal'
  if (bs >= 100 && bs < 126) return 'prediabetic'
  if (bs >= 126) return 'diabetic'
  return ''
})

const bloodSugarAnalysis = computed(() => {
  if (!bloodSugar.value) return ''
  const category = bloodSugarCategoryClass.value
  
  switch (category) {
    case 'low': return '您的血糖偏低，可能需要立即補充糖分並諮詢醫師。'
    case 'normal': return '您的空腹血糖在正常範圍內，請繼續保持良好的飲食習慣。'
    case 'prediabetic': return '您的血糖稍高，已進入糖尿病前期，需要積極預防。'
    case 'diabetic': return '您的血糖達到糖尿病診斷標準，請立即諮詢醫師。'
    default: return ''
  }
})

const bloodSugarRecommendation = computed(() => {
  if (!bloodSugar.value) return ''
  const category = bloodSugarCategoryClass.value
  
  switch (category) {
    case 'low': return '建議：立即補充糖分、避免空腹過久、醫師諮詢'
    case 'normal': return '建議：維持均衡飲食、規律運動、控制體重'
    case 'prediabetic': return '建議：低糖飲食、增加運動、定期檢測'
    case 'diabetic': return '建議：立即就醫、血糖監控、飲食控制'
    default: return ''
  }
})

// Triglycerides Analysis
const triglyceridesCategory = computed(() => {
  if (!bloodSugar.triglycerides) return ''
  const tg = bloodSugar.triglycerides
  
  if (tg < 150) return '正常'
  if (tg >= 150 && tg < 200) return '邊緣偏高'
  if (tg >= 200 && tg < 500) return '偏高'
  if (tg >= 500) return '極高'
  return ''
})

const triglyceridesCategoryClass = computed(() => {
  if (!bloodSugar.triglycerides) return ''
  const tg = bloodSugar.triglycerides
  
  if (tg < 150) return 'normal'
  if (tg >= 150 && tg < 200) return 'borderline'
  if (tg >= 200 && tg < 500) return 'high'
  if (tg >= 500) return 'very-high'
  return ''
})

const triglyceridesAnalysis = computed(() => {
  if (!bloodSugar.triglycerides) return ''
  const category = triglyceridesCategoryClass.value
  
  switch (category) {
    case 'normal': return '您的三酸甘油脂在正常範圍內，有助於維持心血管健康。'
    case 'borderline': return '您的三酸甘油脂稍微偏高，建議調整飲食和生活習慣。'
    case 'high': return '您的三酸甘油脂偏高，增加心血管疾病風險，需要積極改善。'
    case 'very-high': return '您的三酸甘油脂過高，請立即諮詢醫師，可能需要藥物治療。'
    default: return ''
  }
})

const triglyceridesRecommendation = computed(() => {
  if (!bloodSugar.triglycerides) return ''
  const category = triglyceridesCategoryClass.value
  
  switch (category) {
    case 'normal': return '建議：維持低脂飲食、規律運動、避免過量酒精'
    case 'borderline': return '建議：減少精製糖、增加Omega-3、控制體重'
    case 'high': return '建議：醫師評估、嚴格飲食控制、藥物可能需要'
    case 'very-high': return '建議：立即就醫、可能需要立即藥物介入'
    default: return ''
  }
})

// Heart Rate Analysis
const heartRateCategory = computed(() => {
  if (!bloodPressure.heartRate) return ''
  const hr = bloodPressure.heartRate
  
  if (hr < 60) return '心率偏慢'
  if (hr >= 60 && hr <= 100) return '正常心率'
  if (hr > 100) return '心率偏快'
  return ''
})

const heartRateCategoryClass = computed(() => {
  if (!bloodPressure.heartRate) return ''
  const hr = bloodPressure.heartRate
  
  if (hr < 60) return 'low'
  if (hr >= 60 && hr <= 100) return 'normal'
  if (hr > 100) return 'high'
  return ''
})

const heartRateAnalysis = computed(() => {
  if (!bloodPressure.heartRate) return ''
  const category = heartRateCategoryClass.value
  
  switch (category) {
    case 'low': return '您的心率偏慢，如果沒有不適症狀，可能是體能良好的表現。'
    case 'normal': return '您的心率在正常範圍內，顯示心臟功能良好。'
    case 'high': return '您的心率偏快，可能與壓力、咖啡因或其他因素有關。'
    default: return ''
  }
})

const heartRateRecommendation = computed(() => {
  if (!bloodPressure.heartRate) return ''
  const category = heartRateCategoryClass.value
  
  switch (category) {
    case 'low': return '建議：如有暈眩或疲勞請就醫、運動員常見現象'
    case 'normal': return '建議：維持規律運動、避免過度咖啡因'
    case 'high': return '建議：減少咖啡因、管理壓力、必要時醫師諮詢'
    default: return ''
  }
})

// Waist Circumference Analysis
const waistCategory = computed(() => {
  if (!physiological.waist) return ''
  const waist = physiological.waist
  
  // 使用世界衛生組織標準（亞洲人）
  if (waist <= 80) return '理想腰圍' // 假設較多女性用戶
  if (waist <= 90) return '注意腰圍'
  if (waist <= 100) return '腰圍過大'
  return '高風險腰圍'
})

const waistCategoryClass = computed(() => {
  if (!physiological.waist) return ''
  const waist = physiological.waist
  
  if (waist <= 80) return 'normal'
  if (waist <= 90) return 'elevated'
  if (waist <= 100) return 'high'
  return 'very-high'
})

const waistAnalysis = computed(() => {
  if (!physiological.waist) return ''
  const category = waistCategoryClass.value
  
  switch (category) {
    case 'normal': return '您的腰圍在健康範圍內，有助於降低心血管疾病和糖尿病風險。'
    case 'elevated': return '您的腰圍稍微偏大，建議開始注意飲食控制和增加運動。'
    case 'high': return '您的腰圍超標，腹部脂肪過多會增加慢性疾病風險。'
    case 'very-high': return '您的腰圍已達高風險範圍，強烈建議諮詢醫師制定減重計畫。'
    default: return ''
  }
})

const waistRecommendation = computed(() => {
  if (!physiological.waist) return ''
  const category = waistCategoryClass.value
  
  switch (category) {
    case 'normal': return '建議：維持健康飲食、規律運動、避免久坐'
    case 'elevated': return '建議：減少精製食物、增加有氧運動、控制食物份量'
    case 'high': return '建議：低卡飲食計畫、每日30分鐘運動、營養師諮詢'
    case 'very-high': return '建議：醫師評估、專業減重計畫、可能需要醫療介入'
    default: return ''
  }
})

// Body Temperature Analysis
const temperatureCategory = computed(() => {
  if (!physiological.temperature) return ''
  const temp = physiological.temperature
  
  if (temp < 36.1) return '體溫偏低'
  if (temp >= 36.1 && temp <= 37.2) return '正常體溫'
  if (temp > 37.2 && temp <= 38.0) return '輕微發燒'
  if (temp > 38.0 && temp <= 39.0) return '中度發燒'
  return '高燒'
})

const temperatureCategoryClass = computed(() => {
  if (!physiological.temperature) return ''
  const temp = physiological.temperature
  
  if (temp < 36.1) return 'low'
  if (temp >= 36.1 && temp <= 37.2) return 'normal'
  if (temp > 37.2 && temp <= 38.0) return 'elevated'
  if (temp > 38.0 && temp <= 39.0) return 'high'
  return 'very-high'
})

const temperatureAnalysis = computed(() => {
  if (!physiological.temperature) return ''
  const category = temperatureCategoryClass.value
  
  switch (category) {
    case 'low': return '您的體溫偏低，可能與環境溫度、體質或健康狀況有關。'
    case 'normal': return '您的體溫在正常範圍內，顯示身體基礎代謝功能良好。'
    case 'elevated': return '您有輕微發燒症狀，可能是感染或其他原因引起。'
    case 'high': return '您有中度發燒，建議多休息並密切觀察症狀變化。'
    case 'very-high': return '您有高燒症狀，請立即就醫並避免延誤治療。'
    default: return ''
  }
})

const temperatureRecommendation = computed(() => {
  if (!physiological.temperature) return ''
  const category = temperatureCategoryClass.value
  
  switch (category) {
    case 'low': return '建議：保暖、適度運動促進循環、如持續偏低請就醫'
    case 'normal': return '建議：維持良好作息、均衡飲食、適度運動'
    case 'elevated': return '建議：多休息、多喝水、避免劇烈活動、觀察症狀'
    case 'high': return '建議：充分休息、補充水分、物理降溫、必要時就醫'
    case 'very-high': return '建議：立即就醫、避免自行用藥、密切監控體溫'
    default: return ''
  }
})

// Overall Health Score
const overallHealthScore = computed(() => {
  let totalScore = 0
  let maxPossibleScore = 0
  
  // BMI Score (25 points max)
  if (physiological.weight && physiological.height) {
    maxPossibleScore += 25
    const bmi = parseFloat(bmiValue.value)
    if (bmi >= 18.5 && bmi < 24) totalScore += 25        // 正常
    else if (bmi >= 24 && bmi < 27) totalScore += 18     // 過重
    else if (bmi >= 17 && bmi < 18.5) totalScore += 15   // 體重過輕
    else if (bmi >= 27 && bmi < 30) totalScore += 12     // 輕度肥胖
    else if (bmi >= 30 && bmi < 35) totalScore += 8      // 中度肥胖
    else totalScore += 3                                 // 重度肥胖
  }
  
  // Blood Pressure Score (35 points max)
  if (bloodPressure.systolic && bloodPressure.diastolic) {
    maxPossibleScore += 35
    const category = bloodPressureCategoryClass.value
    if (category === 'normal') totalScore += 35         // 正常血壓
    else if (category === 'elevated') totalScore += 25  // 血壓偏高
    else if (category === 'stage1') totalScore += 15    // 第一期高血壓
    else if (category === 'stage2') totalScore += 8     // 第二期高血壓
    else totalScore += 2                                // 高血壓危機
  }
  
  // Blood Sugar Score (25 points max)
  if (bloodSugar.value) {
    maxPossibleScore += 25
    const category = bloodSugarCategoryClass.value
    if (category === 'normal') totalScore += 25         // 正常血糖
    else if (category === 'prediabetic') totalScore += 12  // 糖尿病前期
    else if (category === 'diabetic') totalScore += 5   // 糖尿病範圍
    else totalScore += 8                                // 低血糖
  }
  
  // Heart Rate Score (15 points max)
  if (bloodPressure.heartRate) {
    maxPossibleScore += 15
    const category = heartRateCategoryClass.value
    if (category === 'normal') totalScore += 15         // 正常心率
    else totalScore += 10                               // 心率異常
  }
  
  // Waist Circumference Score (15 points max)
  if (physiological.waist) {
    maxPossibleScore += 15
    const category = waistCategoryClass.value
    if (category === 'normal') totalScore += 15         // 理想腰圍
    else if (category === 'elevated') totalScore += 10  // 注意腰圍
    else if (category === 'high') totalScore += 6       // 腰圍過大
    else totalScore += 2                                // 高風險腰圍
  }
  
  // Body Temperature Score (10 points max)
  if (physiological.temperature) {
    maxPossibleScore += 10
    const category = temperatureCategoryClass.value
    if (category === 'normal') totalScore += 10         // 正常體溫
    else if (category === 'low') totalScore += 6        // 體溫偏低
    else if (category === 'elevated') totalScore += 5   // 輕微發燒
    else if (category === 'high') totalScore += 3       // 中度發燒
    else totalScore += 1                                // 高燒
  }
  
  // Calculate percentage score
  if (maxPossibleScore === 0) return 0
  return Math.round((totalScore / maxPossibleScore) * 100)
})

const healthScoreCategory = computed(() => {
  const score = overallHealthScore.value
  if (score >= 80) return '優秀'
  if (score >= 60) return '良好'
  if (score >= 40) return '普通'
  return '需改善'
})

const healthScoreCategoryClass = computed(() => {
  const score = overallHealthScore.value
  if (score >= 80) return 'excellent'
  if (score >= 60) return 'good'
  if (score >= 40) return 'fair'
  return 'poor'
})

const healthScoreAnalysis = computed(() => {
  const score = overallHealthScore.value
  if (score >= 80) return '您的整體健康狀況非常好！請繼續保持良好的生活習慣。'
  if (score >= 60) return '您的整體健康狀況良好，有一些指標可以進一步改善。'
  if (score >= 40) return '您的健康狀況普通，建議積極改善飲食和運動習慣。'
  return '您的健康狀況需要改善，建議諮詢醫療專業人員制定健康計畫。'
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

// Methods - validation functions remain for input validation




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

.health-analysis-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

.health-analysis-section h3 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.8rem;
  border-bottom: 3px solid #42b883;
  padding-bottom: 0.5rem;
}

.analysis-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #42b883;
  transition: transform 0.3s, box-shadow 0.3s;
}

.analysis-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.analysis-card h4 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.analysis-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.main-value {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.main-value .value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #42b883;
}

.main-value .unit {
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

.main-value .category {
  font-size: 1rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  margin-left: 0.5rem;
}

.category.normal {
  background: #d4edda;
  color: #155724;
}

.category.underweight {
  background: #fff3cd;
  color: #856404;
}

.category.overweight {
  background: #ffeaa7;
  color: #856404;
}

.category.obese {
  background: #f8d7da;
  color: #721c24;
}

.category.elevated {
  background: #fff3cd;
  color: #856404;
}

.category.stage1 {
  background: #ffeaa7;
  color: #856404;
}

.category.stage2 {
  background: #f8d7da;
  color: #721c24;
}

.category.crisis {
  background: #f5c6cb;
  color: #721c24;
  animation: pulse 2s infinite;
}

.category.low {
  background: #d1ecf1;
  color: #0c5460;
}

.category.prediabetic {
  background: #fff3cd;
  color: #856404;
}

.category.diabetic {
  background: #f8d7da;
  color: #721c24;
}

.category.borderline {
  background: #fff3cd;
  color: #856404;
}

.category.high {
  background: #ffeaa7;
  color: #856404;
}

.category.very-high {
  background: #f8d7da;
  color: #721c24;
}

.analysis-text {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  border-left: 3px solid #42b883;
}

.recommendation {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
  background: #e8f5e8;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px dashed #42b883;
}

.health-score-card {
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  margin-top: 1rem;
  text-align: center;
}

.health-score-card h4 {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.score-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.score-circle {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
}

.score-value {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.score-label {
  font-size: 0.8rem;
  opacity: 0.9;
}

.score-analysis {
  text-align: left;
  max-width: 300px;
}

.score-category {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.score-category.excellent {
  color: #90EE90;
}

.score-category.good {
  color: #FFE4B5;
}

.score-category.fair {
  color: #FFB6C1;
}

.score-category.poor {
  color: #FFA07A;
}

.score-text {
  font-size: 1rem;
  line-height: 1.4;
  opacity: 0.95;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
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
  
  
  .health-analysis-section {
    padding: 1rem;
  }
  
  .analysis-card {
    padding: 1rem;
  }
  
  .main-value {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .main-value .category {
    margin-left: 0;
  }
  
  .score-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .score-circle {
    width: 100px;
    height: 100px;
  }
  
  .score-value {
    font-size: 1.5rem;
  }
  
  .score-analysis {
    text-align: center;
    max-width: none;
  }
  
  .health-score-card {
    padding: 1.5rem;
  }
}
</style>
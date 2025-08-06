<template>
  <div class="member-center">
    <div class="container">
      <!-- Forms Container -->
      <div class="forms-container">
        <!-- Login Forms -->
        <div v-if="activeAction === 'login'" class="form-section">
          <!-- Member Type Selection for Login - Full Width Buttons -->
          <div class="member-type-half">
            <button 
              @click="activeMemberType = 'regular'"
              :class="['half-btn', { active: activeMemberType === 'regular' }]"
            >
              一般民眾
            </button>
            <button 
              @click="activeMemberType = 'lab'"
              :class="['half-btn', { active: activeMemberType === 'lab' }]"
            >
              檢驗所
            </button>
          </div>
          
          <form @submit.prevent="activeMemberType === 'regular' ? handleRegularLogin() : handleLabLogin()" class="member-form">
            <!-- Regular Member Login Fields -->
            <template v-if="activeMemberType === 'regular'">
              <div class="input-group">
                <label>帳號或手機</label>
                <input
                  ref="regularEmailInput"
                  type="text"
                  v-model="regularLogin.email"
                  placeholder="請輸入帳號或手機號碼"
                  required
                />
              </div>
              <div class="input-group">
                <label>密碼</label>
                <input
                  type="password"
                  v-model="regularLogin.password"
                  placeholder="請輸入密碼"
                  required
                />
              </div>
              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="regularLogin.rememberMe">
                  記住我
                </label>
                <a href="#" @click.prevent="showForgotPassword = true" class="forgot-link">忘記密碼？</a>
              </div>
            </template>

            <!-- Lab Member Login Fields -->
            <template v-if="activeMemberType === 'lab'">
              <div class="input-group">
                <label>帳號</label>
                <input
                  ref="labUsernameInput"
                  type="text"
                  v-model="labLogin.username"
                  placeholder="請輸入帳號"
                  required
                />
              </div>
              <div class="input-group">
                <label>密碼</label>
                <input
                  type="password"
                  v-model="labLogin.password"
                  placeholder="請輸入密碼"
                  required
                />
              </div>
              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="labLogin.rememberMe">
                  記住我
                </label>
                <a href="#" @click.prevent="showLabForgotPassword = true" class="forgot-link">忘記密碼？</a>
              </div>
            </template>

            <button type="submit" class="submit-btn">登入</button>
            <div class="form-footer">
              <span class="footer-text">還沒有帳號？</span>
              <button type="button" @click="activeAction = 'register'" class="link-btn">立即註冊</button>
            </div>
          </form>
        </div>

        <!-- Registration Forms -->
        <div v-if="activeAction === 'register'" class="form-section">
          <!-- Member Type Selection for Registration -->
          <div class="member-type-half">
            <button 
              @click="activeMemberType = 'regular'"
              :class="['half-btn', { active: activeMemberType === 'regular' }]"
            >
              一般民眾
            </button>
            <button 
              @click="activeMemberType = 'lab'"
              :class="['half-btn', { active: activeMemberType === 'lab' }]"
            >
              檢驗所
            </button>
          </div>
          
          <form @submit.prevent="activeMemberType === 'regular' ? handleRegularRegister() : handleLabRegister()" :class="['member-form', { 'lab-form': activeMemberType === 'lab' }]">
            <!-- Regular Member Registration Fields -->
            <template v-if="activeMemberType === 'regular'">
              <div class="input-group">
                <label>姓名</label>
                <input
                  type="text"
                  v-model="regularRegister.name"
                  placeholder="請輸入真實姓名"
                  required
                />
              </div>
              <div class="input-group">
                <label>電子信箱</label>
                <input
                  type="email"
                  v-model="regularRegister.email"
                  placeholder="請輸入電子信箱"
                  required
                />
              </div>
              <div class="input-group">
                <label>手機號碼</label>
                <input
                  type="tel"
                  v-model="regularRegister.phone"
                  placeholder="請輸入手機號碼"
                  required
                />
              </div>
              <div class="input-group">
                <label>身分證字號</label>
                <input
                  type="text"
                  v-model="regularRegister.idNumber"
                  placeholder="請輸入身分證字號"
                  maxlength="10"
                  required
                />
              </div>
              <div class="input-group">
                <label>出生年月日</label>
                <input
                  type="date"
                  v-model="regularRegister.birthDate"
                  required
                />
              </div>
              <div class="input-group">
                <label>性別</label>
                <select v-model="regularRegister.gender" required>
                  <option value="">請選擇性別</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                </select>
              </div>
              <div class="input-group">
                <label>密碼</label>
                <input
                  type="password"
                  v-model="regularRegister.password"
                  placeholder="請輸入密碼（至少6個字元）"
                  minlength="6"
                  required
                />
              </div>
              <div class="input-group">
                <label>確認密碼</label>
                <input
                  type="password"
                  v-model="regularRegister.confirmPassword"
                  placeholder="請再次輸入密碼"
                  required
                />
              </div>
              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="regularRegister.agreeTerms" required>
                  我同意<a href="#" class="terms-link">服務條款</a>與<a href="#" class="privacy-link">隱私權政策</a>
                </label>
              </div>
            </template>

            <!-- Lab Member Registration Fields -->
            <template v-if="activeMemberType === 'lab'">
              <div class="input-group">
                <label>檢驗所名稱</label>
                <input
                  type="text"
                  v-model="labRegister.labName"
                  placeholder="請輸入檢驗所全名"
                  required
                />
              </div>
              <div class="input-group">
                <label>檢驗所代號</label>
                <input
                  type="text"
                  v-model="labRegister.labCode"
                  placeholder="請輸入檢驗所代號"
                  required
                />
              </div>
              <div class="input-group">
                <label>負責人姓名</label>
                <input
                  type="text"
                  v-model="labRegister.contactName"
                  placeholder="請輸入負責人姓名"
                  required
                />
              </div>
              <div class="input-group">
                <label>聯絡電話</label>
                <input
                  type="tel"
                  v-model="labRegister.phone"
                  placeholder="請輸入聯絡電話"
                  required
                />
              </div>
              <div class="input-group">
                <label>電子信箱</label>
                <input
                  type="email"
                  v-model="labRegister.email"
                  placeholder="請輸入電子信箱"
                  required
                />
              </div>
              <div class="input-group">
                <label>檢驗所地址</label>
                <input
                  type="text"
                  v-model="labRegister.address"
                  placeholder="請輸入完整地址"
                  required
                />
              </div>
              <div class="input-group">
                <label>營業執照號碼</label>
                <input
                  type="text"
                  v-model="labRegister.licenseNumber"
                  placeholder="請輸入營業執照號碼"
                  required
                />
              </div>
              <div class="input-group">
                <label>帳號</label>
                <input
                  type="text"
                  v-model="labRegister.username"
                  placeholder="請輸入登入帳號"
                  required
                />
              </div>
              <div class="input-group">
                <label>密碼</label>
                <input
                  type="password"
                  v-model="labRegister.password"
                  placeholder="請輸入密碼（至少8個字元）"
                  minlength="8"
                  required
                />
              </div>
              <div class="input-group">
                <label>確認密碼</label>
                <input
                  type="password"
                  v-model="labRegister.confirmPassword"
                  placeholder="請再次輸入密碼"
                  required
                />
              </div>
              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="labRegister.agreeTerms" required>
                  我同意<a href="#" class="terms-link">檢驗所服務條款</a>與<a href="#" class="privacy-link">隱私權政策</a>
                </label>
              </div>
            </template>

            <button type="submit" class="submit-btn">
              {{ activeMemberType === 'lab' ? '申請註冊' : '註冊' }}
            </button>
            <p v-if="activeMemberType === 'lab'" class="note">* 檢驗所註冊需要審核，我們將在3-5個工作天內回覆</p>
            <div class="form-footer">
              <span class="footer-text">已經有帳號？</span>
              <button type="button" @click="activeAction = 'login'" class="link-btn">立即登入</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Forgot Password Modal -->
      <div v-if="showForgotPassword" class="modal-overlay" @click="showForgotPassword = false">
        <div class="modal" @click.stop>
          <h3>忘記密碼</h3>
          <form @submit.prevent="handleForgotPassword">
            <div class="input-group">
              <label>請輸入註冊時的帳號或手機</label>
              <input
                type="text"
                v-model="forgotPasswordEmail"
                placeholder="帳號或手機號碼"
                required
              />
            </div>
            <div class="modal-actions">
              <button type="button" @click="showForgotPassword = false" class="cancel-btn">取消</button>
              <button type="submit" class="submit-btn">發送重設連結</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Lab Forgot Password Modal -->
      <div v-if="showLabForgotPassword" class="modal-overlay" @click="showLabForgotPassword = false">
        <div class="modal" @click.stop>
          <h3>檢驗所忘記密碼</h3>
          <form @submit.prevent="handleLabForgotPassword">
            <div class="input-group">
              <label>註冊時的電子信箱</label>
              <input
                type="email"
                v-model="labForgotPassword.email"
                placeholder="電子信箱"
                required
              />
            </div>
            <div class="modal-actions">
              <button type="button" @click="showLabForgotPassword = false" class="cancel-btn">取消</button>
              <button type="submit" class="submit-btn">發送重設連結</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Active states
const activeMemberType = ref<'regular' | 'lab'>('regular')
const activeAction = ref<'login' | 'register'>('login')

// Input refs
const regularEmailInput = ref<HTMLInputElement>()
const labUsernameInput = ref<HTMLInputElement>()

// Focus input based on member type and action
const focusInput = async () => {
  if (activeAction.value === 'login') {
    await nextTick()
    if (activeMemberType.value === 'regular' && regularEmailInput.value) {
      regularEmailInput.value.focus()
    } else if (activeMemberType.value === 'lab' && labUsernameInput.value) {
      labUsernameInput.value.focus()
    }
  }
}

// Initialize from URL parameters
onMounted(() => {
  const actionParam = route.query.action as string
  if (actionParam === 'login' || actionParam === 'register') {
    activeAction.value = actionParam
  }
  focusInput()
})

// Watch for member type changes and focus accordingly
watch([activeMemberType, activeAction], () => {
  focusInput()
})

// Modal states
const showForgotPassword = ref(false)
const showLabForgotPassword = ref(false)

// Form data
const regularLogin = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const regularRegister = reactive({
  name: '',
  email: '',
  phone: '',
  idNumber: '',
  birthDate: '',
  gender: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const labLogin = reactive({
  labCode: '',
  username: '',
  password: '',
  rememberMe: false
})

const labRegister = reactive({
  labName: '',
  labCode: '',
  contactName: '',
  phone: '',
  email: '',
  address: '',
  licenseNumber: '',
  username: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const forgotPasswordEmail = ref('')
const labForgotPassword = reactive({
  labCode: '',
  email: ''
})

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^09\d{8}$/
  return phoneRegex.test(phone)
}

const validateIdNumber = (idNumber: string): boolean => {
  const idRegex = /^[A-Z]\d{9}$/
  return idRegex.test(idNumber)
}

const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return '密碼至少需要6個字元'
  }
  if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
    return '密碼需包含至少一個字母和一個數字'
  }
  return null
}

// Form handlers
const handleRegularLogin = () => {
  if (!regularLogin.email || !regularLogin.password) {
    alert('請輸入帳號和密碼')
    return
  }

  // Check if it's email or phone number
  const isEmail = validateEmail(regularLogin.email)
  const isPhone = validatePhone(regularLogin.email)
  
  if (!isEmail && !isPhone) {
    alert('請輸入有效的帳號或手機格式')
    return
  }

  console.log('Regular member login:', regularLogin)
  alert('一般會員登入功能待實現')
  // TODO: Implement actual login logic
}

const handleRegularRegister = () => {
  // Validate required fields
  if (!regularRegister.name || !regularRegister.email || !regularRegister.phone || 
      !regularRegister.idNumber || !regularRegister.birthDate || !regularRegister.gender || 
      !regularRegister.password || !regularRegister.confirmPassword) {
    alert('請填寫所有必填欄位')
    return
  }

  // Validate email format
  if (!validateEmail(regularRegister.email)) {
    alert('請輸入有效的電子信箱格式')
    return
  }

  // Validate phone format
  if (!validatePhone(regularRegister.phone)) {
    alert('請輸入有效的手機號碼格式（09xxxxxxxx）')
    return
  }

  // Validate ID number format
  if (!validateIdNumber(regularRegister.idNumber)) {
    alert('請輸入有效的身分證字號格式（A123456789）')
    return
  }

  // Validate password
  const passwordError = validatePassword(regularRegister.password)
  if (passwordError) {
    alert(passwordError)
    return
  }

  // Check password confirmation
  if (regularRegister.password !== regularRegister.confirmPassword) {
    alert('密碼與確認密碼不符')
    return
  }
  
  if (!regularRegister.agreeTerms) {
    alert('請同意服務條款與隱私權政策')
    return
  }

  console.log('Regular member register:', regularRegister)
  alert('一般會員註冊成功！請檢查您的電子信箱以啟用帳號。')
  // TODO: Implement actual registration logic
}

const handleLabLogin = () => {
  if (!labLogin.username || !labLogin.password) {
    alert('請輸入帳號和密碼')
    return
  }

  console.log('Lab member login:', labLogin)
  alert('檢驗所會員登入功能待實現')
  // TODO: Implement actual login logic
}

const handleLabRegister = () => {
  if (labRegister.password !== labRegister.confirmPassword) {
    alert('密碼與確認密碼不符')
    return
  }
  
  if (!labRegister.agreeTerms) {
    alert('請同意檢驗所服務條款與隱私權政策')
    return
  }

  console.log('Lab member register:', labRegister)
  alert('檢驗所註冊申請已提交！我們將在3-5個工作天內審核並回覆。')
  // TODO: Implement actual registration logic
}

const handleForgotPassword = () => {
  if (forgotPasswordEmail.value) {
    console.log('Forgot password for:', forgotPasswordEmail.value)
    alert('密碼重設連結已發送至您的電子信箱')
    showForgotPassword.value = false
    forgotPasswordEmail.value = ''
  }
}

const handleLabForgotPassword = () => {
  if (labForgotPassword.email) {
    console.log('Lab forgot password for:', labForgotPassword.email)
    alert('密碼重設連結已發送至您的電子信箱')
    showLabForgotPassword.value = false
    labForgotPassword.email = ''
  }
}
</script>

<style scoped>
.member-center {
  min-height: 100%;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  padding: 2rem 0;
}

.container {
  max-width: min(800px, 90vw);
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

h2 {
  text-align: center;
  color: #42b883;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.action-tabs {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.member-type-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e0e0e0;
  background: white;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.action-tabs .tab-btn {
  font-size: 1.1rem;
  padding: 1rem 2rem;
  font-weight: 600;
}

.member-type-tabs .tab-btn {
  font-size: 0.95rem;
  padding: 0.6rem 1.2rem;
}

.tab-btn:hover {
  border-color: #42b883;
  color: #42b883;
}

.tab-btn.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.forms-container {
  background: white;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.member-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

.member-form.lab-form {
  max-width: min(700px, 90vw);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
}

.member-form.lab-form .form-options,
.member-form.lab-form .submit-btn,
.member-form.lab-form .form-footer,
.member-form.lab-form .note {
  grid-column: 1 / -1;
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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.checkbox-label input {
  margin: 0;
}

.forgot-link,
.terms-link,
.privacy-link {
  color: #42b883;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-link:hover,
.terms-link:hover,
.privacy-link:hover {
  text-decoration: underline;
}

.submit-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  background: #369870;
}

.note {
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal h3 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  background: white;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.cancel-btn:hover {
  border-color: #666;
}

.modal .submit-btn {
  flex: 1;
  margin-top: 0;
}

.form-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.footer-text {
  color: #666;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.link-btn {
  background: none;
  border: none;
  color: #42b883;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0;
  transition: color 0.3s;
}

.link-btn:hover {
  color: #369870;
}

.member-type-half {
  display: flex;
  margin-bottom: 0;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
}

.half-btn {
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  background: white;
  color: #666;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border-right: 1px solid #e0e0e0;
}

.half-btn:last-child {
  border-right: none;
}

.half-btn:hover {
  background: #f8f9fa;
  color: #42b883;
}

.half-btn.active {
  background: #42b883;
  color: white;
}

/* Tablet and larger screen adjustments */
@media (min-width: 1200px) {
  .container {
    max-width: min(900px, 85vw);
  }
  
  .member-form.lab-form {
    max-width: min(800px, 85vw);
    gap: 1.5rem 2rem;
  }
  
  .forms-container {
    padding: 3rem;
  }
}

/* Large desktop adjustments */
@media (min-width: 1400px) {
  .container {
    max-width: min(1000px, 80vw);
  }
  
  .member-form.lab-form {
    max-width: min(900px, 80vw);
    gap: 2rem 2.5rem;
  }
}

/* Tablet adjustments */
@media (max-width: 1024px) {
  .member-form.lab-form {
    grid-template-columns: 1fr;
    max-width: min(600px, 90vw);
  }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
    max-width: 95vw;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .member-type-tabs,
  .action-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .tab-btn {
    width: 200px;
    text-align: center;
  }
  
  .forms-container {
    padding: 1.5rem;
    margin: 0 0.5rem;
  }
  
  .member-form {
    max-width: 100%;
    padding: 1.5rem;
  }
  
  .member-form.lab-form {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
  
  .form-options {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .modal {
    padding: 1.5rem;
    margin: 1rem;
    width: calc(100% - 2rem);
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .half-btn {
    font-size: 1rem;
    padding: 1.2rem 1rem;
  }
  
  .member-center {
    padding: 1rem 0;
    min-height: calc(100vh - 200px);
  }
}
</style>
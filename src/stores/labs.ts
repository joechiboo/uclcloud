import { defineStore } from 'pinia'

export interface Lab {
  id: number
  name: string
  address: string
  phone: string
  email?: string
  website?: string
  city: string
  district: string
  services: string[]
  openHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  description: string
  latitude?: number
  longitude?: number
}

export const useLabsStore = defineStore('labs', {
  state: () => ({
    labs: [
      {
        id: 1,
        name: '大安聯合醫事檢驗所',
        address: '台北市大安區復興南路二段151巷33號',
        phone: '02-27049977',
        website: 'http://www.ucl.com.tw',
        city: '台北',
        district: '大安區',
        services: ['血液學檢查', '尿液檢查', '生化學檢查', '免疫學檢查', '過敏免疫檢查', '細菌學與黴菌檢查'],
        openHours: {
          monday: '08:00-21:00',
          tuesday: '08:00-21:00',
          wednesday: '08:00-21:00',
          thursday: '08:00-21:00',
          friday: '08:00-21:00',
          saturday: '08:00-21:00',
          sunday: '休息'
        },
        description: '聯合醫事檢驗所台北分所，提供全方位醫事檢驗服務，設備先進，檢驗項目齊全。',
        latitude: 25.0330,
        longitude: 121.5654
      },
      {
        id: 2,
        name: '聯合醫事檢驗所-桃園',
        address: '桃園市桃園區萬壽路3段178號1樓',
        phone: '03-2183853',
        website: 'http://qflab.tmed.tw/',
        city: '桃園',
        district: '桃園區',
        services: ['血液學檢查', '尿液檢查', '生化學檢查', '糞便檢查', '免疫學檢查'],
        openHours: {
          monday: '08:00-21:00',
          tuesday: '08:00-21:00',
          wednesday: '08:00-21:00',
          thursday: '08:00-21:00',
          friday: '08:00-21:00',
          saturday: '08:00-17:00',
          sunday: '休息'
        },
        description: '聯合醫事檢驗所桃園分所，提供專業醫檢服務，守護桃園地區民眾健康。',
        latitude: 24.9937,
        longitude: 121.2654
      },
      {
        id: 3,
        name: '聯合醫事檢驗所-新竹',
        address: '新竹市東區復興里自由路９５巷１８弄２６號１樓及２樓',
        phone: '03-5330188',
        website: 'http://hc.ucl.com.tw/webshop/shop/index.asp',
        city: '新竹',
        district: '東區',
        services: ['血液學檢查', '生化學檢查', '微量元素測定與血中毒物濃度測定', '免疫學檢查', '過敏免疫檢查', '病毒學檢查'],
        openHours: {
          monday: '08:00-21:00',
          tuesday: '08:00-21:00',
          wednesday: '08:00-21:00',
          thursday: '08:00-21:00',
          friday: '08:00-21:00',
          saturday: '08:00-21:00',
          sunday: '08:00-12:00'
        },
        description: '聯合醫事檢驗所新竹分所，採用最新檢驗技術，提供精準可靠的檢驗結果。',
        latitude: 24.8138,
        longitude: 120.9675
      },
      {
        id: 4,
        name: '聯合醫事檢驗所',
        address: '臺中市北屯區文心路四段619號1樓、夾層、2樓、3樓、4樓',
        phone: '04-23135120',
        website: 'http://tc.ucl.com.tw/',
        city: '台中',
        district: '北屯區',
        services: ['血液學檢查', '尿液檢查', '生化學檢查', '免疫學檢查', '細胞學檢查', '核子醫學檢查'],
        openHours: {
          monday: '08:00-21:00',
          tuesday: '08:00-21:00',
          wednesday: '08:00-21:00',
          thursday: '08:00-21:00',
          friday: '08:00-21:00',
          saturday: '08:00-21:00',
          sunday: '休息'
        },
        description: '聯合醫事檢驗所台中總所，中部地區知名檢驗機構，服務項目完整，檢驗品質優良。',
        latitude: 24.1477,
        longitude: 120.6736
      },
      {
        id: 5,
        name: '高雄聯合醫事檢驗所',
        address: '高雄市苓雅區成功一路212號',
        phone: '07-269-3130',
        city: '高雄',
        district: '苓雅區',
        services: ['血液學檢查', '尿液檢查', '生化學檢查', '輸血前檢查', '免疫學檢查', '健保無給付'],
        openHours: {
          monday: '08:00-21:00',
          tuesday: '08:00-21:00',
          wednesday: '08:00-21:00',
          thursday: '08:00-21:00',
          friday: '08:00-21:00',
          saturday: '08:00-21:00',
          sunday: '休息'
        },
        description: '聯合醫事檢驗所高雄分所，專業醫檢服務，配合南部地區需求，提供便民服務。',
        latitude: 22.6273,
        longitude: 120.2918
      },
      {
        id: 6,
        name: '靜平醫事檢驗所',
        address: '嘉義市東區公明路２５９號',
        phone: '05-2169955',
        city: '嘉義',
        district: '東區',
        services: ['血液學檢查', '尿液檢查', '糞便檢查', '生化學檢查', '細菌學與黴菌檢查'],
        openHours: {
          monday: '09:00-18:00',
          tuesday: '09:00-18:00',
          wednesday: '09:00-18:00',
          thursday: '09:00-18:00',
          friday: '09:00-18:00',
          saturday: '休息',
          sunday: '休息'
        },
        description: '靜平醫事檢驗所，在地深耕多年的檢驗所，提供親切專業的檢驗服務。',
        latitude: 23.4801,
        longitude: 120.4491
      }
    ] as Lab[],
    cities: ['台北', '桃園', '新竹', '台中', '嘉義', '高雄'],
    services: [
      '尿液檢查',
      '糞便檢查',
      '血液學檢查',
      '生化學檢查',
      '微量元素測定與血中毒物濃度測定',
      '輸血前檢查',
      '免疫學檢查',
      '細菌學與黴菌檢查',
      '病毒學檢查',
      '細胞學檢查',
      '穿剌液採取液檢查',
      '核子醫學檢查',
      '過敏免疫檢查',
      '健保無給付',
      '其他'
    ]
  }),
  
  getters: {
    getLabById: (state) => (id: number) => {
      return state.labs.find(lab => lab.id === id)
    },
    
    getLabsByCity: (state) => (city: string) => {
      return state.labs.filter(lab => lab.city === city)
    },
    
    getLabsByService: (state) => (service: string) => {
      return state.labs.filter(lab => lab.services.includes(service))
    },
    
    searchLabs: (state) => (keyword: string) => {
      const lowerKeyword = keyword.toLowerCase()
      return state.labs.filter(lab => 
        lab.name.toLowerCase().includes(lowerKeyword) ||
        lab.address.toLowerCase().includes(lowerKeyword) ||
        lab.city.toLowerCase().includes(lowerKeyword) ||
        lab.district.toLowerCase().includes(lowerKeyword) ||
        lab.services.some(service => service.toLowerCase().includes(lowerKeyword))
      )
    }
  }
})
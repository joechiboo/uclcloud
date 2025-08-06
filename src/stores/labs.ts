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
        description: '大安聯合醫事檢驗所(Union Clinical Laboratory，UCL)總部坐落於台北市大安區，於1973年成立，超過一百位員工的工作團隊分布在三個部門。技術部共有50位員工，其學歷背景涵蓋了台灣所有的醫技院校之專長，檢驗服務的範圍包括血液、鏡檢、血凝、血庫、生化、血清、免疫、病毒、細菌、特殊生化。台北實驗室建構全省首座暨全東南亞最長的西門子實驗室全自動化軌道系統，除了常規檢驗的服務外，也提供NIPT、子癲前症篩檢、96項食物過敏原檢測、癌症風險基因分析等先進檢驗服務。',
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
        description: '新竹聯合醫事檢驗所成立於中華民國97年4月，承襲聯合體系秉持一貫的服務目標，站在臨床醫師及病人的立場提供正確、顧客滿意之臨床實驗室。於民國100年3月16日完成財團法人全國認證基金會(TAF)醫學測試領域71項認證，認證實驗室編號2186。新竹聯合共有14位員工，主要分成業務部、技術部、行政部三個部門。同仁們秉持著「準確」的數據、「即時」的報告時效、「親切」的服務態度，以提供顧客正確、迅速的檢驗服務、滿足顧客需求為目標。',
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
import './scss/index.scss'
import {Router} from '@core/routes/Router'
import {Dashboard} from '@/pages/Dashboard'
import {ExcelPage} from '@/pages/ExcelPage'


new Router('#app', {
  dashboard: Dashboard,
  excel: ExcelPage
})


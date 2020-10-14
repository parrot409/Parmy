import PageIndex from './pages/Index'
import PageCollecting from './pages/collecting'
import pageCollected from './pages/collected'


export default [
  {
    path: '/home',
    name: 'home',
    component: PageIndex
  },
  {
    path: '/collecting',
    name: 'collecting',
    component: PageCollecting
  },
  {
    path: '/collected',
    name: 'collected',
    component: pageCollected
  }
]

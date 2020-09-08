import PageIndex from './pages/Index'
import PageCollecting from './pages/collecting'

export default [
  {
    path: '/home',
    name: 'home',
    component: PageIndex
  },
  {
    path: '/collecting',
    name: 'collecting',
    component: PageCollecting,
    props: true
  }
]

import PageIndex from './pages/Index'
import PageCollecting from './pages/collecting'

export default [
  {
    path: '/',
    name: 'home',
    component: PageCollecting
  },
  {
    path: '/collecting',
    name: 'collecting',
    props: true
  }
]

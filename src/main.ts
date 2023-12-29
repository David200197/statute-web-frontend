import 'reflect-metadata'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { aboutUsService } from './modules/about-us/about-us.di'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//TODO: DELETE
const bootstrap = async () => {
  const res = await aboutUsService.findAll()
  res.fold(
    (error) => console.log(error),
    (data) => console.log(data)
  )
}
bootstrap()

import 'reflect-metadata'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { authService } from './modules/auth/auth.di'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

//TODO: DELETE
const bootstrap = async () => {
  const res = await authService.login({ username: '', password: '' })
  console.log(res.getOrElse({ accessToken: '', refreshToken: '' }))
}
bootstrap()

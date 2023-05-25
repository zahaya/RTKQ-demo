import { configureStore } from '@reduxjs/toolkit'
import studentApi from './studentApi'


const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer
  },
  // 中间件
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(studentApi.middleware)
})

export default store


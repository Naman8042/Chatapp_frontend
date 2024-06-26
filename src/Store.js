import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slices/Data'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})
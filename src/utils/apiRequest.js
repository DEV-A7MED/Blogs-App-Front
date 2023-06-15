
import axios from 'axios'

const requset=axios.create({
    baseURL:"https://blogs-app-back.vercel.app/api"
    // baseURL:"http://localhost:8000/api"
})
export default requset

import axios from 'axios'

const requset=axios.create({
    baseURL:"https://blogs-app-back.vercel.app/api"
})
export default requset
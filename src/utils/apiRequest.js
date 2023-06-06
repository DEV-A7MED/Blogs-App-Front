
import axios from 'axios'

const requset=axios.create({
    baseURL:"http://localhost:8000/api"
})
export default requset
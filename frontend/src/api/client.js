import axios from "axios"

const api = axios.create({
  baseURL:
    "https://crime-ai-backend-production.up.railway.app",
})

export default api
import dotenv from 'dotenv'
import {v2 as cloud} from 'cloudinary'
dotenv.config()
cloud.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret :process.env.API_SECERT 
})
export default cloud
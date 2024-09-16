import {v2 as cloudinary} from "cloudinary"
import { cloud } from './envs';

export const CloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory:()=>{
        return cloudinary.config({
            cloud_name: cloud.cloudName,
            api_key: cloud.apiKey,
            api_secret: cloud.apiSecret,
        })
    }
}
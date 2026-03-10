import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'root',
  api_key: process.env.CLOUDINARY_API_KEY || '289699272556856',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'RlS9BumbzEr835Qf1c2cMlnq_yg'
});

export default cloudinary;

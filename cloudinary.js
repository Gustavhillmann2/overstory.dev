require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Array med alle vores public IDs
const publicIds = [
  'image1_izjn09',
  'image2_wjcvhs',
  'image3_e4ixgc',
  'image4_vnz3mg',
  'image5_ianxbd',
  'image6_njxdes',
  'image7_pqt7n3',
  'image8_e0useu'
];

// Generer URL'er for alle billeder
const urls = publicIds.map(id => 
  cloudinary.url(id, { transformation: [{ fetch_format: 'auto' }] })
);

console.log(urls);
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
	'image1_zue0cr',
	'image2_hj1ez1',
	'image4_y72k6a',
	'image5_rtglh2',
	'image6_fqaysd',
	'image7_lc1tdd',
	'image9_xtrx5r',
	'image8_smw3k0'
];

// Generer URL'er for alle billeder
const urls = publicIds.map(id => 
	cloudinary.url(id, { transformation: [{ fetch_format: 'auto' }] })
);

console.log(urls);
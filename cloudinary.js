/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};

/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};

//////////////////
//
// Main function
//
//////////////////
(async () => {

    // 8 lokale billede-paths
    const imagePaths = [
        './public/images/img1.jpg',
        './public/images/img2.jpg',
        './public/images/img3.jpg',
        './public/images/img4.jpg',
        './public/images/img5.jpg',
        './public/images/img6.jpg',
        './public/images/img7.jpg',
        './public/images/img8.jpg'
    ];

    // Upload alle billeder
    const publicIds = await uploadManyImages(imagePaths);
    console.log("Uploaded images:", publicIds);

    // Hent farver for første billede
    const colors = await getAssetInfo(publicIds[0]);

    // Lav imagetag for første billede
    const imageTag = await createImageTag(publicIds[0], colors[0][0], colors[1][0]);

    console.log(imageTag);

})();
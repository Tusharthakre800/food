const Imagekit = require('imagekit');

const imagekit = new Imagekit({
    publicKey: process.env.image_public_key,
    privateKey: process.env.image_private_key,
    urlEndpoint: process.env.image_url_endpoint,
});


async function uploadFile(file,fileName) {
    try {
        const result = await imagekit.upload({
            file: file,
            fileName: fileName,
        });
        return result;
    } catch (error) {
        console.error('Error uploading image to ImageKit:', error);
        throw error;
    }
}


module.exports = {
    uploadFile
}
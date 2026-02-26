const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - The public_id to assign to the file
 * @returns {Promise<object>} - The Cloudinary upload result
 */
async function uploadFile(fileBuffer, fileName) {
    try {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    public_id: fileName,
                },
                (error, result) => {
                    if (error) {
                        console.error('Error uploading to Cloudinary:', error);
                        return reject(error);
                    }
                    resolve(result);
                }
            );
            uploadStream.end(fileBuffer);
        });
    } catch (error) {
        console.error('Error in uploadFile service:', error);
        throw error;
    }
}

/**
 * Generates an optimized URL for an image
 * @param {string} publicId - The Cloudinary public ID
 * @returns {string} - The optimized URL
 */
function getOptimizedUrl(publicId) {
    return cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto'
    });
}

/**
 * Generates an auto-cropped square thumbnail URL
 * @param {string} publicId - The Cloudinary public ID
 * @param {number} size - Width and height in pixels
 * @returns {string} - The transformed URL
 */
function getThumbnailUrl(publicId, size = 500) {
    return cloudinary.url(publicId, {
        crop: 'auto',
        gravity: 'auto',
        width: size,
        height: size,
    });
}

module.exports = {
    uploadFile,
    getOptimizedUrl,
    getThumbnailUrl
};

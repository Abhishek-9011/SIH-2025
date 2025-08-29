import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

/**
 * Upload a file to Cloudinary
 * Supports file paths, URLs, or buffers
 * @param {string|Buffer} file - Path, URL, or buffer of the file
 * @returns {Promise<Object>} Cloudinary upload response
 */
export const uploadMedia = async (file) => {
  try {
    // If it's a buffer, use upload_stream
    if (Buffer.isBuffer(file)) {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(file); // send the buffer to the stream
      });
    } else {
      // For string path or URL
      const uploadResponse = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });
      return uploadResponse;
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - Cloudinary public_id of the file to delete
 */
export const deleteMedia = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};

import sharp from "sharp";
import fs from "fs-extra";

export const processImage = async (filePath, outputDir) => {
  try {
    const outputFilePath = `${outputDir}/${Date.now()}-output.webp`;
    await sharp(filePath).webp({ quality: 80 }).toFile(outputFilePath);
    return outputFilePath;
  } catch (error) {
    throw new Error("Error processing the image with sharp");
  }
};

export const deleteFile = async (filePath) => {
  try {
    await fs.remove(filePath);
  } catch (error) {
    console.error(`Failed to delete file: ${filePath}`, error);
  }
};

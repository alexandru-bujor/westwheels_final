// Import all car template images
import image1 from '@/assets/car_template/98179535_Image_1.jpg';
import image2 from '@/assets/car_template/98179535_Image_2.jpg';
import image3 from '@/assets/car_template/98179535_Image_3.jpg';
import image4 from '@/assets/car_template/98179535_Image_4.jpg';
import image5 from '@/assets/car_template/98179535_Image_5.jpg';
import image6 from '@/assets/car_template/98179535_Image_6.jpg';
import image7 from '@/assets/car_template/98179535_Image_7.jpg';
import image8 from '@/assets/car_template/98179535_Image_8.jpg';
import image9 from '@/assets/car_template/98179535_Image_9.jpg';
import image10 from '@/assets/car_template/98179535_Image_10.jpg';
import image11 from '@/assets/car_template/98179535_Image_11.jpg';
import image12 from '@/assets/car_template/98179535_Image_12.jpg';
import image13 from '@/assets/car_template/98179535_Image_13.jpg';

// Export all images as an array
export const carTemplateImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
];

// Helper function to get images for a car (cycles through all images)
export const getCarImages = (carId: string | number): string[] => {
  // Convert string ID to number for consistent hashing
  let id: number;
  if (typeof carId === 'string') {
    // Extract numeric part from strings like "transit-1" or use hash
    const match = carId.match(/\d+/);
    if (match) {
      id = parseInt(match[0]);
    } else {
      // Hash the string to a number
      id = carId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }
  } else {
    id = carId;
  }
  
  // Use modulo to cycle through images based on car ID
  const startIndex = id % carTemplateImages.length;
  const images: string[] = [];
  
  // Return all images, starting from a different index for each car
  for (let i = 0; i < carTemplateImages.length; i++) {
    images.push(carTemplateImages[(startIndex + i) % carTemplateImages.length]);
  }
  
  return images;
};

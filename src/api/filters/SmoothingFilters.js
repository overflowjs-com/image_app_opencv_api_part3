import cv from 'opencv4nodejs';   

export default class SmoothingFilters {

    constructor(type, image) {
        this.type = type;
        this.image = image;
    }

    process() {
        let processedImage = null;

        if (this.type == "blur") {
            processedImage = cv.blur(this.image, new cv.Size(10, 10));
        } else if(this.type == "gaussian_blur") {
            processedImage = cv.gaussianBlur(this.image, new cv.Size(5, 5), 1.2, 1.2);
            // processedImage = this.image.gaussianBlur(new cv.Size(10, 10), 1.2);
        } else if(this.type == "median_blur") {
            processedImage = cv.medianBlur(this.image, 10);
        } else if(this.type == "bilateral_filter") {
            processedImage = this.image.bilateralFilter(9, 2.0, 2.0);
        }

        return processedImage;
    }

}
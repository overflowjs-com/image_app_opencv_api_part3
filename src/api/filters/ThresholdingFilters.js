import cv from 'opencv4nodejs';  

export default class ThresholdingFilters {

    constructor(type, image) {

        this.type = type;
        this.image = image;
    }

    process() {
        let processedImage = null;

        this.image = this.image.gaussianBlur(new cv.Size(5, 5), 1.2);
        this.image = this.image.cvtColor(cv.COLOR_BGR2GRAY);
            
        if (this.type == "simple_threshold") {
            processedImage = this.image.threshold(127, 255, cv.THRESH_BINARY);
        }
            
        if(this.type == "adaptive_threshold") {
            processedImage = this.image.adaptiveThreshold(255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2);
        }

        if(this.type == "otasu_threshold") {
            processedImage = this.image.threshold(0, 255, cv.THRESH_BINARY+cv.THRESH_OTSU);
        }

        return processedImage;
        
    }
}
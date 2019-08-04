import cv from "opencv4nodejs";

export default class ContourFilters {

    constructor(type, image) {
        this.type = type;
        this.image = image;
    }

    process() {

        this.image = this.image.gaussianBlur(new cv.Size(5, 5), 1.2);

        let grayImage = this.image.cvtColor(cv.COLOR_BGR2GRAY);
        grayImage = grayImage.adaptiveThreshold(255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2);

        if(this.type == "find_all_contours") {
            
            let contours = grayImage.findContours(cv.RETR_TREE, cv.CHAIN_APPROX_NONE, new cv.Point2(0, 0));

            const color = new cv.Vec3(41, 176, 218);

            contours = contours.sort((c0, c1) => c1.area - c0.area);

            const imgContours = contours.map((contour) => {
                return contour.getPoints();
            });

            this.image.drawContours(imgContours, -1, color, 2);
        }

        if(this.type == "find_filtered_contours") {

            let contours = grayImage.findContours(cv.RETR_LIST, cv.CHAIN_APPROX_NONE,  new cv.Point2(0, 0));
            
            const color = new cv.Vec3(41, 176, 218);
            
            contours = contours.sort((c0, c1) => c1.area - c0.area);

            
            const imgContours = contours.map((contour) => {
                return contour.getPoints();
            });

            this.image.drawContours(imgContours, -1, color, 0);
        }

        return  this.image;
    }
}
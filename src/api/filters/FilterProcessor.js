import cv from 'opencv4nodejs';   
import SmoothingFitlers from './SmoothingFilters';
import ThresholdingFilters from './ThresholdingFilters';
import ContourFilters from './ContourFilters';

export default class FilterProcessor {

    constructor(data, type) {
        this.data = data;
        this.type  = type
    }

    getInputImage() {

        const base64data =this.data.replace('data:image/jpeg;base64','')
                            .replace('data:image/png;base64','');//Strip image type prefix
        const buffer = Buffer.from(base64data,'base64');
        const image = cv.imdecode(buffer);

        return image;
        
    }

    process() {
        
        let outputImage = null;

        if (["blur", "gaussian_blur", "median_blur", "bilateral_filter"].indexOf(this.type) >  -1) {
            const filter = new SmoothingFitlers(this.type, this.getInputImage());
            outputImage = filter.process();
        }

        if (["simple_threshold", "adaptive_threshold", "otasu_threshold"].indexOf(this.type) > -1) {
            const filter = new ThresholdingFilters(this.type, this.getInputImage());
            outputImage = filter.process();

        }

        if (["find_all_contours", "find_filtered_contours"].indexOf(this.type) >  -1) {
            const filter = new ContourFilters(this.type, this.getInputImage());
            outputImage = filter.process();
        }
        
        const outBase64 =  cv.imencode('.jpg', outputImage).toString('base64');

        const output = 'data:image/jpeg;base64,'+outBase64 + ''

        return output;
    }

}
//@ts-ignore
import sharp from 'sharp';

const converter = function(input:HTMLImageElement, output:HTMLImageElement) {
    Buffer.from(input.dir);
    sharp(input)
        .metadata().then(({width}) => sharp(input)
        .resize(width * 8)
        .png())
        .then(function (data:Blob) {
            console.log("Image converted successfully!");
            console.dir(data);
            output.src = URL.createObjectURL(data);
        })
        .catch(function (err:any) {
            console.error(err);
        });
}

export default converter;

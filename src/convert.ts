//@ts-ignore
import sharp from 'sharp';

const converter = function(input:HTMLImageElement, output:HTMLImageElement) {
    const inBuf = Buffer.from(input.src);
    sharp(inBuf)
        .metadata().then(({width}) => sharp(inBuf)
            .resize(width * 8)
            .png()
            .toBuffer()
        )
        .then(function (data:Buffer) {
            console.log("Image converted successfully!");
            let blobData = new Blob([data], {type:'image/png'});
            output.src = URL.createObjectURL(blobData);
        })
        .catch(function (err:any) {
            console.error(err);
        });
}

export default converter;

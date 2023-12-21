const sharp = require("sharp");

const converter = function(input) {
    sharp(input)
        .metadata().then(({width}) => sharp(input)
        .resize(width * 8)
        .png())
        .then(function (data) {
            console.log("Image converted successfully!");
            console.dir(data);
        })
        .catch(function (err) {
            console.error(err);
        })
}

export default converter;

const sharp = require("sharp");

const inFileName = process.argv[2];
const outFileName = "cvt_" + inFileName;

sharp(inFileName)
    .metadata().then(({ width }) => sharp(input)
    .resize(width * 8)
    .toFile(outFileName))
.then(function(data){
    console.log("Image converted successfully!");
    console.dir(data);
})
.catch(function(err){
    console.error(err);
})

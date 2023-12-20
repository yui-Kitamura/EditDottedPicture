const sharp = require("sharp");

sharp(process.argv[2])
    .metadata().then(({ width }) => sharp(process.argv[2])
    .resize(width * 8)
    .toFile("cvt_" + process.argv[2]))
.then(function(data){
    console.log("Image converted successfully!");
    console.dir(data);
})
.catch(function(err){
    console.error(err);
})

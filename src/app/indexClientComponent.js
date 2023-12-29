'use client';

import {
    DefaultFileReader
} from "next/dist/server/future/route-matcher-providers/dev/helpers/file-reader/default-file-reader";

export default function indexClientComponent(){
    return (
        <input type={"button"} value={"upload"} onClick={() => handleUpload()}/>
    )
}

const fileReader = new DefaultFileReader();
fileReader.onload = function(event) {
    document.getElementById("inputImg").src = event.target.result;
};

function handleUpload() {
    const selFiles = document.getElementById("selectInput").files;
    if(!selFiles){
        return;
    }
    fileReader.read(selFiles[0]).then(r => {});
}


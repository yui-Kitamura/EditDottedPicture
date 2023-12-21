import './App.css';

function App() {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        document.getElementById("inputImg").src = event.target.result;
    };

    function handleUpload() {
        const selFiles = document.getElementById("selectInput").files;
        if(!selFiles){
            return false;
        }
        fileReader.readAsDataURL(selFiles[0]);
    }

    function handleConvert(){
        //converter(inImgTag.src);
    }

    return (
    <main className="App">
      <section>
        <input id={"selectInput"} type={"file"} accept={"image/png"} />
        <input type={"button"} value={"upload"} onClick={handleUpload} />
        <input type={"button"} value={"convert"} onClick={handleConvert} />
      </section>
      <figure>
        <figcaption>入力画像</figcaption>
          <picture>
            <img id={"inputImg"} alt={"選択された画像"}/>
          </picture>
      </figure>
      <figure>
        <figcaption>出力画像</figcaption>
        <img id={"outputImg"} alt={"出力された画像"} />
      </figure>
    </main>
  );
}

export default App;

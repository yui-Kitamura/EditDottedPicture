import './App.css';

function App() {
  return (
    <main className="App">
      <section>
        <input type={"file"} accept={"image/png"}/>
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

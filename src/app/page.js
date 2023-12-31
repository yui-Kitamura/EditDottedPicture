import indexClientComponent from './indexClientComponent';
import ClientComponent from "react";
//import converter from "./convert.ts";

export default function App() {
    return (
        <main className="App">
            <form>
                <input id={"selectInput"} type={"file"} accept={"image/png"}/>
                <ClientComponent myAction={indexClientComponent}/>
                <input type={"submit"} value={"convert"}/>
            </form>
            <figure>
                <figcaption>入力画像</figcaption>
                <picture>
                    <img id={"inputImg"} alt={"選択された画像"}/>
                </picture>
            </figure>
            <figure>
                <figcaption>出力画像</figcaption>
                <img id={"outputImg"} alt={"出力された画像"}/>
            </figure>
        </main>
);
}

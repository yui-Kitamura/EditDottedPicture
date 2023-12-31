"use client";

import { useRef, useState } from 'react';
import { convert, loadImage } from '../lib/DottedPictureConverter';
import styles from './converter.module.css';

export const Converter = () => {
  const outputImgRef = useRef<HTMLImageElement>(null);
  const [previewSize, setPreviewSize] = useState<[width: number, height: number]>([0, 0]);

  const [ inputFilePreviewURL, _setInputFilePreviewURL] = useState('');
  const [ outputFilePreviewURL, _setoutputFilePreviewURL] = useState('');

  const setInputFilePreviewURL = (val: string) => {
    if (inputFilePreviewURL != '') URL.revokeObjectURL(outputFilePreviewURL);
    _setInputFilePreviewURL(val);
  }

  const setOutputFilePreviewURL = (val: string) => {
    if (outputFilePreviewURL != '') URL.revokeObjectURL(outputFilePreviewURL);
    _setoutputFilePreviewURL(val);
  }


  const handleFileUpload = (formData: FormData) => {
    const file = formData.get('file');
  
    if (!(file instanceof File)) {
      console.warn('file is not instance of File');
      return;
    }

    const inputFileURL = URL.createObjectURL(file);
    setInputFilePreviewURL(inputFileURL);

    convert(inputFileURL)
      .then((convertedURL: string) => {
        setOutputFilePreviewURL(convertedURL);
      });
  };

  return (
    <>
      <form action={handleFileUpload}>
        <input name={"file"} type={"file"} accept={"image/png"}/>
        <input type={"submit"} value={"convert"}/>
      </form>
      <figure className={styles.fig}>
        <figcaption>入力画像</figcaption>
        <picture>
          <img src={inputFilePreviewURL} id={"inputImg"} alt={"選択された画像"}/>
        </picture>
      </figure>
      <figure className={styles.fig}>
        <figcaption>出力画像</figcaption>
        <img src={outputFilePreviewURL} id={"outputImg"} alt={"出力された画像"}/>
      </figure>
    </>
  )
}

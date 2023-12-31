"use client";

import { useRef, useState } from 'react';
import { convert, loadImage } from '../lib/DottedPictureConverter';

export const Converter = () => {
  const outputImgRef = useRef<HTMLImageElement>(null);
  const [previewSize, setPreviewSize] = useState<[width: number, height: number]>([0, 0]);

  const handleFileUpload = (formData: FormData) => {
    const file = formData.get('file');
  
    if (!(file instanceof File)) {
      console.warn('file is not instance of File');
      return;
    }

    const inputFileURL = URL.createObjectURL(file);
    loadImage(inputFileURL).then(img => {
      setPreviewSize([img.width, img.height]);

      return convert(img);
    }).then((convertedURL: string) => {
      if (outputImgRef.current) {
        outputImgRef.current.addEventListener('load', () => {
          URL.revokeObjectURL(convertedURL)
        }, { once: true });

        outputImgRef.current.src = convertedURL;
      }
    }).finally(() => {
      URL.revokeObjectURL(inputFileURL);
    });
  };

  return (
    <>
      <form action={handleFileUpload}>
        <input name={"file"} type={"file"} accept={"image/png"}/>
        <input type={"button"} value={"upload"}/>
        <input type={"submit"} value={"convert"}/>
      </form>
      <figure>
        <figcaption>入力画像</figcaption>
        <picture>
          <img width={previewSize[0]} height={previewSize[1]} id={"inputImg"} alt={"選択された画像"}/>
        </picture>
      </figure>
      <figure>
        <figcaption>出力画像</figcaption>
        <img width={previewSize[0]} height={previewSize[1]} ref={outputImgRef} id={"outputImg"} alt={"出力された画像"}/>
      </figure>
    </>
  )
}

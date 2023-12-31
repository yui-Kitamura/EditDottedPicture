/**
 * from https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Iterators_and_generators#ジェネレーター関数
 * and modified by tsutoringo
 * @param start 
 * @param to
 * @param step 
 * @returns 
 */
function* range(start: number, to: number, step = 1) {
  const end = (start + to) * step;
  for (let i = start; i < end; i += step) {
    yield i;
  }
  return;
}

type ReacanglePosition = [x: number, y: number];

function* rectangleWalker(width: number, height: number): Generator<ReacanglePosition, void> {
  for (const byp of range(0, height)) {
    for (const bxp of range(0, width)) {
      yield [bxp, byp];
    }
  }

  return;
}

type RenderOption = {
  BOX_SIZE: number,
  BORDER_COLOR: [ R: number, G: number, B: number],
}

export class DottedPictureContertError extends Error {}

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    const handleLoad = () => {
      img.removeEventListener('error', handleError);
      resolve(img);
    };
    const handleError = (error: ErrorEvent) => {
      img.removeEventListener('load', handleLoad);
      reject(error);
    };

    img.addEventListener('load', handleLoad, { once: true });
    img.addEventListener('error', handleError, { once: true });
  })
}

const toBlobPromisefy = (canvas: HTMLCanvasElement, type?: string | undefined, quality?: any): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export const convert = async (image: HTMLImageElement, option?: Partial<RenderOption>): Promise<string> => {
  const {
    BOX_SIZE,
    BORDER_COLOR
  } = Object.assign({
    BOX_SIZE: 8,
    BORDER_COLOR: [0, 0, 0]
  } as RenderOption, option);

  const INLINE_BOX_SIZE = BOX_SIZE - 2;
  const BORDER_COLOR_STR = `rgb(${BORDER_COLOR[0]}, ${BORDER_COLOR[1]}, ${BORDER_COLOR[2]})`;

  const baseCanvas = document.createElement('canvas');
  baseCanvas.width = image.width;
  baseCanvas.height = image.height;
  const baseCtx = baseCanvas.getContext('2d')!;
  baseCtx.drawImage(image, 0, 0);
  const baseImageData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);
  const basePixels = baseImageData.data;

  const outputWidth =  baseImageData.width * BOX_SIZE;
  const outputHeight = baseImageData.height * BOX_SIZE;
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = outputWidth;
  outputCanvas.height = outputHeight;
  const outputCtx = outputCanvas.getContext('2d')!;

  for (const [ bxp, byp ] of rectangleWalker(baseImageData.width, baseImageData.height)) {
    const basePixelPos = ((baseImageData.width * byp) + bxp) * 4;
    if (
      basePixels[basePixelPos + 3] === 0
    ) continue;

    outputCtx.fillStyle = BORDER_COLOR_STR;
    outputCtx.fillRect(bxp * BOX_SIZE, byp * BOX_SIZE, BOX_SIZE, BOX_SIZE);

    if (!(
      basePixels[basePixelPos] === BORDER_COLOR[0]
      && basePixels[basePixelPos + 1] === BORDER_COLOR[1]
      && basePixels[basePixelPos + 2] === BORDER_COLOR[2]
    )) {
      outputCtx.fillStyle = `rgb(${basePixels[basePixelPos]}, ${basePixels[basePixelPos + 1]}, ${basePixels[basePixelPos + 2]})`;
      outputCtx.fillRect((bxp * BOX_SIZE + 1), (byp * BOX_SIZE + 1), INLINE_BOX_SIZE, INLINE_BOX_SIZE);
    }
  }

  const blob = await toBlobPromisefy(outputCanvas);
  if (blob == null) {
    throw new DottedPictureContertError('Failed conveted canvas to blob');
  }

  return URL.createObjectURL(blob);
}


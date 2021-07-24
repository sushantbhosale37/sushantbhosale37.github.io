import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class HtmltoimageService {
  constructor() {}

  imageConfig = {
    imgName: 'capture.png',
    type: 'image/png'
  };

  canvasImage(element, config: object = this.imageConfig) {
    return html2canvas(element).then(canvas => {
      canvas.toBlob(blob => {
        if (config['download']) {
          saveAs(blob, config['imgName']);
        }
      }, config['type']);
      return canvas;
    });
  }
}

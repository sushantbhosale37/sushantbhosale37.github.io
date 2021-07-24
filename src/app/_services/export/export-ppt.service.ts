import { Injectable } from '@angular/core';
import * as pptGen from 'pptxgenjs';

@Injectable({
  providedIn: 'root'
})
export class ExportPptService {
  constructor() {}

  exportPPT(pptConfig) {
    const pptx = new pptGen();

    pptConfig['slides'].forEach(slideData => {
      const slide = pptx.addNewSlide();
      slide.addText(slideData['title'], {
        x: 1,
        y: 0.2,
        fontSize: 18,
        color: '363636'
      });

      if (pptConfig['logo']['visible']) {
        slide.addImage({
          path: pptConfig['logo']['path'],
          x: 0.1,
          y: 0.1,
          w: pptConfig['logo']['width'],
          h: pptConfig['logo']['height']
        });
      }

      slide.addImage({
        data: slideData['base64data'],
        x: 1,
        y: 1,
        w: slideData['width'],
        h: slideData['height'],
        sizing: {
          type: 'contain',
          w: slideData['width'],
          h: slideData['height']
        }
      });
    });

    pptx.save(pptConfig['filename']);
  }
}

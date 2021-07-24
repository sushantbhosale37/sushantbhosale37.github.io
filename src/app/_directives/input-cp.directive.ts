import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cpInput]'
})
export class CpInputDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'border', 'none');
    renderer.setStyle(el.nativeElement, 'background', 'none');
    renderer.setStyle(el.nativeElement, 'outline', 'none');
    renderer.setStyle(el.nativeElement, 'border-bottom', '1px solid gray');
    renderer.setStyle(el.nativeElement, 'font-size', '13px');
    renderer.setStyle(el.nativeElement, 'height', '25px');
    renderer.setStyle(el.nativeElement, 'border-radius', '0');
    renderer.setStyle(el.nativeElement, '-webkit-box-shadow', 'none');
    renderer.setStyle(el.nativeElement, '-moz-box-shadow', 'none');
    renderer.setStyle(el.nativeElement, 'box-shadow', 'none');
  }
}

import { Directive, HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[hostElement]'
})
export class CustomInputDirective implements OnInit {

  height: number;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    console.log(this.el.nativeElement.getBoundingClientRect());
  }

  setHostStyle(maxHeight) {
    console.log(this.el.nativeElement.getBoundingClientRect());
    this.renderer.setStyle(this.el.nativeElement, 'max-height', maxHeight + 'px');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'auto');
  }

  getHostHeight() {
    return this.el.nativeElement.getBoundingClientRect().top;
  }

  removeHostStyle() {
    this.renderer.removeStyle(this.el.nativeElement, 'max-height');
    this.renderer.removeStyle(this.el.nativeElement, 'overflow');
  }

  log() {
    console.log(this.el.nativeElement.getBoundingClientRect());
  }
  /* @HostListener('', ['$event.target']) onClick(target) {
    target.blur();
    target.select();
  }*/

}

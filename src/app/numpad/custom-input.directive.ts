import { Directive, HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[hostElement]'
})
export class CustomInputDirective implements OnInit {

  height: number;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    console.log(this.el.nativeElement.offsetHeight);
    console.log(this.el.nativeElement.getBoundingClientRect());
    console.log(this.el.nativeElement.clientTop);
    console.log(getComputedStyle(this.el.nativeElement).borderTopWidth);
  }


 /* @HostListener('', ['$event.target']) onClick(target) {
    target.blur();
    target.select();
  }*/

}

import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[customInput]'
})
export class CustomInputDirective {

  constructor() { }

  @HostListener('click', ['$event.target']) onClick(target) {
    target.blur();
    target.select();
  }

}

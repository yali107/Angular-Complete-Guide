import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }

  // close dropdown by click anywhere on the website
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elementRef: ElementRef) { }

}

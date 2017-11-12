import { Directive, HostListener, HostBinding, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {    
  
//   dropdownClass: string = 'open';

  constructor (private elRef: ElementRef, private elRenderer: Renderer2){}  
  
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen(){
    // if (this.opened){
    //   this.elRenderer.removeClass(this.elRef.nativeElement, this.dropdownClass) 
    // }else{          
    //   this.elRenderer.addClass(this.elRef.nativeElement, this.dropdownClass);
    // }

    this.isOpen = !this.isOpen;
  } 

  ngOnInit(){}

}
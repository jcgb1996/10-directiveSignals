import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
  standalone: false
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color :string = 'red';
  private _error?: ValidationErrors | null ;

  @Input()
  set color(value:string){
    this._color =value;
    this.setStyle();
  }

  @Input()
  set error(value: ValidationErrors | null | undefined){
    this._error =value;
    this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    this.htmlElement = el;

  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle():void{
    if( !this.el ) return;

    this.el!.nativeElement.style.color = this._color;


    //if( !this.htmlElement ) return;
//
    //this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void{
    if(!this.el) return;
    if(!this._error) {
      this.el!.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._error);
    console.log(errors);

    if(errors.includes("required")){
      this.el!.nativeElement.innerText = 'este campo es requerido';
      return;
    }

    if(errors.includes("minlength")){
      this.el!.nativeElement.innerText = `Mínimo ${this._error!['minlength']['requiredLength']}/ ${ this._error!['minlength']['actualLength'] } caracteres`;
      return;
    }

    if(errors.includes("email")){
      this.el!.nativeElement.innerText = 'mail no tiene un formato valido';
      return;
    }

  }

}

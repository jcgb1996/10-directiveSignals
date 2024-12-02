import { Component, computed, signal } from '@angular/core';

@Component({
  standalone: false,
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  public counter = signal(10);

  //señal de solo lectura
  public squareCounter = computed( () => {
     return this.counter() * this.counter();
  }  );

  increaseBy( value: number ): void{
    //this.counter.set( this.counter() + value );

    this.counter.update( current => current + value );
  }
}

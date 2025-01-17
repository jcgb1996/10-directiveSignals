import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  standalone: false,

  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnInit, OnDestroy {




  public user=signal<User>({
    id: 1,
    email: 'aaa@bb.com',
    first_name: 'jose',
    last_name: 'carlos',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png'
  });

  public fullName = computed( ()=>`${this.user().first_name} ${this.user().last_name}` );

  public userChangedEffect = effect( ()=> { console.log(`${this.user().first_name} - ${ this.counter() }`) }  );

  public counter = signal<number>(10);

  ngOnDestroy(): void {
    this.userChangedEffect.destroy();
  }

  ngOnInit(): void {
    setInterval(() => {
        this.counter.update( current=> current +1 );
        //if(this.counter() === 20) this.userChangedEffect.destroy();

    }, 1000);
  }

  onFieldUpdated( field: keyof User, value:string ): void{
    //console.log({field, value});
    //this.user.set( {
    //  ...this.user(),
    //  [field]: value
    //});

    //this.user.update( (current) =>({
    //  ...current,
    //  [field]: value
    //}) );

    this.user.update( (current)=> {

      switch(field){
        case 'email':
          current.email = value;
        break;
        case 'avatar':
            current.avatar = value;
            break;
         case 'first_name':
              current.first_name = value;
              break;
         case 'last_name':
          current.last_name = value;
          break;
          case 'id':
           current.id = Number(value);
           break;

      }
      return structuredClone(current);
    } );
  }

  incrementBy(value: number): void{
    this.counter.update( current => current + value );
  }

}

import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  standalone: false,

  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {

  public userService: UserServiceService = inject(UserServiceService);
  public userId: WritableSignal<number> = signal(1);

  public currentUser = signal<User | undefined >(undefined);
  public userWasFound = signal(true);

  ngOnInit(): void {
    this.loadUser( this.userId() );
  }

  loadUser(id: number): void {
    if(id <= 0) return;

    this.userId.set(id);
    this.currentUser.set(undefined);

    this.userService.getUserById(id)
    .subscribe( user => {
      this.currentUser.set(user);
    } )

  }
}

import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router,
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    return this.router.navigate(['auth/login']);
  }
//   login(username, password) {
//     return this.router.navigate(['auth/login'],)
//         .pipe(map(user => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('user', JSON.stringify(user));
//             this.userSubject.next(user);
//             return user;
//         }));
// }
}

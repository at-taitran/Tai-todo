import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/user';

// import { AuthenticationService } from '@app/_services';
// import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin = this.fb.group({
    username: [''],
    password: ['']
  });
  // loading = false;
  // submitted = false;
  // returnUrl: string;
  // error = '';

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) {
    // // redirect to home if already logged in
    // if (this.authenticationService.userValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    var checku = localStorage.getItem('user');
    if( checku != null){
      if(checku != ''){
        this.router.navigate(['features/home']);  
      }else{
        this.router.navigate(['auth/login']);
      }
    }else{
      return null;
    }
  }
  onLogin(): void {
    var storageListUser = [];
    storageListUser = JSON.parse(localStorage.getItem('listUser'));
    var checkUser = storageListUser.find(x => x.username == this.formLogin.value.username);
    if (checkUser != null) {
      let checkpassword = storageListUser.find(y => y.password == this.formLogin.value.password);
      if (checkpassword != null) {
        alert('Login ok');
        localStorage.setItem('user',JSON.stringify(checkUser));
        // redirect to home 
        this.router.navigate(['features/home']);
      } else {
        alert('Invalid username or password !!');
        this.router.navigate(['auth/login']);
      }
    } else {
      alert('Invalid username or password !!');
      this.router.navigate(['auth/login']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../../../user'
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms'

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  form = this.fb.group({
    username: ['', [Validators.required,Validators.minLength(4), forbiddenUsername(['admin', 'manager'])]],
    email: ['',Validators.email],
    pw: this.fb.group({
      password: ['', Validators.required,Validators.minLength(6)],
      confirmPassword: ['', Validators.required]
    },
      {
        validators: comparePassword
      })
  });

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    var userstorage = localStorage.getItem('listUser');
    if (userstorage != null) {
      var storageListuser = [];
      storageListuser = JSON.parse(userstorage);
      var checkExitUser = storageListuser.find(x => x.username == this.form.value.username);
      if (checkExitUser != null) {
        alert('User name da ton tai !');
        // redirect to register page
        this.router.navigate(['auth/register']);
      } else {
        let curUser = new User;
        curUser = { "username": this.form.value.username, "password": this.form.value.pw.password, "email": this.form.value.email };
        storageListuser.push(curUser);
        localStorage.setItem('listUser', JSON.stringify(storageListuser));
        alert('Register Success !!! ');
        console.log(storageListuser);
        // redirect to login
        this.router.navigate(['auth/login']);
      }
    } else {
      let curUser = new User;
      curUser = { "username": this.form.value.username, "password": this.form.value.pw.password, "email": this.form.value.email };
      let curList = [];
      curList.push(curUser);
      localStorage.setItem('listUser', JSON.stringify(curList));
      alert('Register Success !!! ');
      console.log(curList);
      // redirect to login
      this.router.navigate(['auth/login']);
    }
  }
}
// compare pw & confirm pw
export function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}
// Valid username
export function forbiddenUsername(users = []) {
  return (c: AbstractControl) => {
    return (users.includes(c.value)) ? {
      invalidusername: true
    } : null;
  };
}

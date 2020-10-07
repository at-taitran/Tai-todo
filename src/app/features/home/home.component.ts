import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Post } from 'src/user';
import { ReactiveFormsModule, FormsModule, FormBuilder, CheckboxControlValueAccessor } from '@angular/forms';
import { ServiceService } from '../../auth/service.service';

// import {} '../../../Share/img';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  parrentElement: any;
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private accountService: ServiceService) { }
  formPost = this.fb.group({
    title: [''],
    quantity: [''],
  });
  title = [];
  titles = [];
  sbox: string;
  quantity: number;
  ngOnInit(): void {
    //view table todo
    this.titles = this.getUserPost();
    setTimeout(() => {
      this.quantity = this.titles.length;
      this.renew();
    }, 30);
  }
  logout() {
    this.accountService.logout();
  }
  // Post todo
  submitPost() {
    const todoStorage = localStorage.getItem('todos');
    if (todoStorage != null) {
      let todos = [];
        todos = JSON.parse(todoStorage);
        let d = new Date();
        let seconds = Math.round(d.getTime() / 10);
        let newId = JSON.parse(localStorage.getItem('user')).username + "-" + seconds;
        let userId = JSON.parse(localStorage.getItem('user')).username;
        let newPost = new Post;
        newPost = {
          "id": newId, "userId": userId,
          "title": this.formPost.value.title, "status": false
        };
        todos.push(newPost);
        localStorage.removeItem('todos');
        localStorage.setItem('todos', JSON.stringify(todos));
        this.sbox = "";
        this.titles.push(newPost);
    }
    else {
      let curPost = new Post;
        let userId = JSON.parse(localStorage.getItem('user')).username;
        let d = new Date();
        let seconds = Math.round(d.getTime() / 10);
        curPost = {
          "id": userId + "-" + seconds, "userId": userId, "title": this.formPost.value.title,
          "status": false
        };
        let todos = [];
        todos.push(curPost);
        localStorage.setItem('todos', JSON.stringify(todos));
        alert(' Post success !!! ');
        this.sbox = "";
        this.titles.push(curPost);
        this.renew();
    }
  }
  delete(a) {
    //Delete in storage
    let curPostList = JSON.parse(localStorage.getItem('todos'));
    let index = curPostList.findIndex(item => item.id === a.id);
    curPostList.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(curPostList));
    // Current View after deltete
    this.titles.splice(index, 1);
    setTimeout(() => {
      this.quantity = this.titles.length;
    }, 20);
  };
  // Reload Function
  reload() {
    this.titles = this.getUserPost();
    setTimeout(() => {
      this.quantity = this.titles.length;
      this.renew();
    }, 10);
  };
  //Renew check box
  renew() {
    const check = document.querySelectorAll('input');
    const cb = document.querySelectorAll('img');
    for (let i = 0; check[i]; i++) {
      let c = (check[i] as HTMLElement).getAttribute("value");
      if (c == "true") {
        check[i].checked = true;
      } else {
        if (c == "false") {
          check[i].checked = false;
        }
      }
    }
    for (let j = 0; cb[j]; j++) {
      let d = (cb[j] as HTMLElement).getAttribute("alt");
      if (d == "true") {
        cb[j].style.display = "block";
      } else {
        cb[j].style.display = "none";
      }
    }
    const label = document.querySelectorAll("a");
    for (let x = 0; label[x]; x++) {
      let lab = (label[x] as HTMLElement).getAttribute("rel");
      if (lab == "true") {
        label[x].style.textDecorationLine = "line-through";
        label[x].style.color = "#d9d9d9";
      } else {
        if (lab == "false") {
          label[x].style.textDecorationLine = "none";
          label[x].style.color = "#1a1a1a";
        }
      }
    }
  };
  //Check box change function
  changestatus(i) {
    let Alltodo = JSON.parse(localStorage.getItem('todos'));
    if (i.status == false) {
      let pchange = i;
      pchange.status = true;
      let index = Alltodo.findIndex(item => item.id == pchange.id);
      Alltodo.splice(index, 1, pchange);
      localStorage.setItem('todos', JSON.stringify(Alltodo));
      setTimeout(() => {
        this.renew();
      }, 20);
    }
    else {
      let pchange = i;
      pchange.status = false;
      let index = Alltodo.findIndex(item => item.id == pchange.id);
      Alltodo.splice(index, 1, pchange);
      localStorage.setItem('todos', JSON.stringify(Alltodo));
      setTimeout(() => {
        this.renew();
      }, 50);
    }
  };
  //Get curent post
  getUserPost() {
    let getUsername = (JSON.parse(localStorage.getItem('user'))).username;
    let allpost = JSON.parse(localStorage.getItem('todos'));
    const userPost = allpost.filter(x => x.userId == getUsername);
    this.titles = userPost;
    return userPost;
  };
  all() {
    this.titles = this.getUserPost();
    setTimeout(() => {
      this.changeTag("all");
      this.quantity = this.titles.length;
      this.renew();
    }, 30);
  }
  active() {
    this.changeTag("Active");
    this.activeTag("all", "Complete");
    let ar = this.getUserPost().filter(x => x.status == true);
    for (let index = 0; index < ar.length; index++) {
      this.titles.splice(this.titles.indexOf(ar[index]), 1);
    }
    setTimeout(() => {
      this.quantity = this.titles.length;
      this.renew();
    }, 50);
  };
  complete() {
    this.changeTag("Complete");
    this.activeTag("all", "Active");
    let ar = this.getUserPost().filter(x => x.status == false);
    for (let index = 0; index < ar.length; index++) {
      this.titles.splice(this.titles.indexOf(ar[index]), 1);
    }
    setTimeout(() => {
      this.quantity = this.titles.length;
      this.renew();
    }, 50);
  };
  edit(i) {
    let labelEdit = document.getElementById("edit" + i.id);
    labelEdit.style.display = "none";
    let inputEdit = document.getElementById("ed" + i.id);
    inputEdit.style.display = "block";
    inputEdit.focus();
  };
  cfedit(i, value) {
    let curPostList = JSON.parse(localStorage.getItem('todos'));
    // let posts = curPostList.filter(x => x.id !== i.id);
    let curPost = new Post;
    curPost = {
      "id": i.id, "userId": i.userId,
      "title": value, "status": i.status
    };
    let index = curPostList.findIndex(item => item.id == curPost.id);
    curPostList.splice(index,1,curPost);
    localStorage.setItem('todos',JSON.stringify(curPostList));
    i.title = value;
    //
    let labelEdit = document.getElementById("edit" + i.id);
    labelEdit.style.display = "block";
    let inputEdit = document.getElementById("ed" + i.id);
    inputEdit.style.display = "none";
  };
  //Change tag style
  changeTag(a) {
    const tag = document.getElementById(a);
    if (a != null) {
      tag.style.color = "#1a1a1a";
      tag.style.border = "1px solid #1a1a1a";
    } else {
      tag.style.color = "#1a1a1a";
      tag.style.border = "1px solid #888";
    }
  };
  activeTag(a, b) {
    const taga = document.getElementById(a);
    const tagb = document.getElementById(b);
    taga.style.color = "#1a1a1a";
    taga.style.border = "1px solid #888";
    tagb.style.border = "1px solid #888";
    tagb.style.color = "#1a1a1a";
  };
  hover(i) {
    let btn = document.getElementById("del" + i.id);
    btn.style.display = "block";
  };
  out(i) {
    let btn = document.getElementById("del" + i.id);
    btn.style.display = "none";
  };
  clearcompleted() {
    const curComplete = this.getUserPost().filter(x => x.status == true);
    const todo = JSON.parse(localStorage.getItem('todos'));
    for (let i = 0; curComplete[i]; i++) {
      this.delete(curComplete[i]);
    }
  };
}

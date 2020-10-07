export class User {
  username: string;
  password: string;
  email:string;
}
var list: Array<User> = new Array();
export class Post {
  id:string;
  userId:string;
  title:string;
  status:boolean;
}
var data: Array<Post> = new Array();

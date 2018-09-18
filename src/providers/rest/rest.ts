import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User} from '../../models/user';
import { tokenNotExpired } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  authToken:any;
  user:any;

  private UserSource = new BehaviorSubject(User);
  currentUser = this.UserSource.asObservable();


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  apiBaseUrl:string = '';
  constructor(public http: HttpClient) {
    this.apiBaseUrl = 'http://localhost:3000/';
  }


  sendUser(user) {
    this.UserSource.next(user);
  }

  getBanks(){
    return new Promise(resolve=>{
      this.http.get(this.apiBaseUrl+'banks').subscribe(data=>{resolve(data);
      },err =>{console.log(err);
      });
    })
  }

  getUsers(){
    return new Promise(resolve=>{
      this.http.get(this.apiBaseUrl+'users').subscribe(data=>{resolve(data);
      },err =>{console.log(err);
      });
    })
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiBaseUrl+'/users', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveBank(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiBaseUrl+'banks', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  registerUser(user: User){
    const body :User = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      cin:"",
      phone:"",
      has_bank_account : true,
      credit: {
        amount :0,
        credit_reason :"",
        hasCredit : false,
        credit_amount : 0,
      },
      
job:{
  has_job: false,
  job_type: "",
  salary:0,
  job_sector : "",
  jobless_years : 0,
  
},

marital_status :{
    status:"",
    children_number:0,
    
},
material_owns : {
  owns_car : false,
  owns_house : false,
  tenant_house : false,
  tenant_amount:0,
}
 
    }
    return this.http.post(this.apiBaseUrl+'users/register',body, this.httpOptions)
  }

  userAuthentification(email, password){
    var data = {
      email: email,
      password: password
    }
    return this.http.post(this.apiBaseUrl+'users/authenticate',data, this.httpOptions )
  } 

  getProfile(){
    this.loadToken();
    let headers = new HttpHeaders({'Authorization': this.authToken, 'Content-Type':'application/json'});
    console.log("hhhehehh",headers)
    return this.http.get(this.apiBaseUrl+'users/profile', {headers:headers} )
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  Logout(){
    this.authToken= null;
    this.user= null;
    localStorage.clear();
  }

  loadToken(){
    const token = localStorage.getItem('id_token')
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }
  
  getUser(){
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

}

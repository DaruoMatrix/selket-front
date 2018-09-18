import {Component, ViewChild} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { RestProvider } from "../../providers/rest/rest";
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  isLoginError:boolean= false;

  @ViewChild('email')  email;
  @ViewChild('password')  password;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor( public navCtrl: NavController, public restProvider: RestProvider,public forgotCtrl: AlertController, public menu: MenuController, 
    public toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
  }

  OnSubmitLogin(email, password){
    console.log("clicked :")

    this.restProvider.userAuthentification(email, password).subscribe((data:any)=>{


      if(data.success){
        this.restProvider.storeUserData(data.token, data.user,);

        console.log("data :",data)
        const toast = this.toastCtrl.create({
          message: 'Bienvenue '+data.user.first_name,
          duration: 3000,
          cssClass : 'normalToast'
        });
        toast.present();
        this.login();
      } 
      
      else {  
        this.isLoginError = true;
      }

    }, (err: HttpErrorResponse)=> {
      this.isLoginError = true;
    })
  }

  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(RegisterPage);
  }






  // go to register page
  register() {
    this.navCtrl.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    this.navCtrl.setRoot(HomePage);
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}

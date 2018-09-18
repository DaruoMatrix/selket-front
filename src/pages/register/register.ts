import {Component} from "@angular/core";
import {NavController, ToastController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { User } from "../../models/user";
import { RestProvider } from "../../providers/rest/rest";
import { NgForm } from "@angular/forms";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  user:User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public restProvider: RestProvider) {

    if(!this.user)
    {
     
      this.user = {
        first_name:"",
        cin :"",
        last_name:  "",
         password :"",
        email: "",
        phone: "",
         has_bank_account : false,
           credit:{
            amount : 0,
            credit_reason : "",
            
            hasCredit : false,
            credit_amount : 0
        },
         
       job:{
         has_job:false,
        job_type : "",
        salary : 0,
        job_sector: "",
        jobless_years : 0,
      },
      marital_status :{
        status : "",
        children_number : 0,
      },
      material_owns : {
        owns_car : false,
        owns_house : false,
       tenant_house : false,
        tenant_amount : 0
      }
      }
    }
    console.log('user : ',this.user)
  }

  ngOnInit() {
    //this.resetForm();
  }


  OnSubmit(form : NgForm){
    const toast = this.toastCtrl.create({
      message: 'Utilisateur enregistrer avec succés ',
      duration: 3000,
      cssClass : 'normalToast'
    });

    const toastError = this.toastCtrl.create({
      message: 'Utilisateur existe déjà',
      duration: 3000,
      cssClass : 'normalToast'
    });
    console.log('on submit clicked');
    this.restProvider.registerUser(form.value).subscribe((data:any) => {
      console.log(data)
      if(data.success == true){

        toast.present();
        this.navCtrl.push(LoginPage);
        this.resetForm(form);

      } else {
        toastError.present();
        console.log('erreur');
      }

    });
  }


  resetForm(form?: NgForm){
    if(form!= null)
    form.reset();
    this.user.first_name="",
    this.user.last_name="",
    this.user.email="",
    this.user.password=""
}



  // register and go to home page
  register() {
    this.navCtrl.setRoot(HomePage);
  }

  // go to login page
  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}

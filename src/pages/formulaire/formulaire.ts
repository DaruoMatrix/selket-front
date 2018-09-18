import { Component } from '@angular/core';
import { NavController, AlertController, MenuController, ToastController } from 'ionic-angular';

import { MapPage } from '../map/map';
import { NgForm } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { User } from '../../models/user';

@Component({
  selector: 'page-formulaire',
  templateUrl: 'formulaire.html'
})
export class FormulairePage {
  client:User;
  user:any;
  jobless = false;

  contrat = false;
  secteur = false;
  constructor(public restService:RestProvider, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, 
    public toastCtrl: ToastController) {
        if(!this.client)
        {
         
          this.client = {
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
          };
        }
        this.getIdentifiedUser();
        console.log("client initial : ", this.client)
        console.log("user connected : ", this.user)
        this.synchronize();
  }

  synchronize(){
    this.client.first_name = this.user.first_name
    this.client.last_name = this.user.last_name
    this.client.email = this.user.email
    this.client.password = this.user.password
    console.log('user synchronized :',this.client)
  }

  getIdentifiedUser(){
    this.user = this.restService.getUser();
  }
  goMap(myForm:NgForm)
  {
    console.log('Form : ',myForm.form.value)


    this.client.credit.amount = myForm.form.value.amount;
    this.client.job.job_type = myForm.form.value.job_type;
    this.client.has_bank_account = myForm.form.value.has_bank_account;
    this.client.credit.credit_reason = myForm.form.value.credit_reason;
    this.client.job.salary = myForm.form.value.salary;
    this.client.marital_status.status = myForm.form.value.status;
    this.client.material_owns.owns_car = myForm.form.value.owns_car;
    this.client.material_owns.owns_house = myForm.form.value.owns_house;
    this.client.marital_status.children_number = myForm.form.value.children_number;
    this.client.material_owns.tenant_house = myForm.form.value.tenant_house;
    this.client.material_owns.tenant_amount = myForm.form.value.tenant_amount;


    //console.log('Client final : ',this.client)
    this.nav.push(MapPage);
  }
  sendUser() {
    this.restService.sendUser(this.client);
  }

  secteurChange(val:any){
    console.log("val : ",val);
    if(val!=null){
    this.secteur = true;
    console.log("secteur true:  ",this.secteur);
    
  }
    else{
    this.secteur = false;
    console.log("secteur false: ",this.secteur);
  }
}
  contratChange(val:any){
    console.log("val : ",val);
    if(val ==1 || val ==2){
    this.contrat = true;
    console.log("contrat true:  ",this.contrat);
  }
    else{
    this.contrat = false;
    console.log("contrat false: ",this.contrat);
  }
}


  jobChange(val:any){
    console.log("val : ",val);
    if(val == 1){
    this.jobless = false;
    console.log("jobless : ",this.jobless);
  }
    else
    this.jobless = true;
    console.log("jobless : ",this.jobless);
  }
  popView(){
    this.nav.pop();
  }



}

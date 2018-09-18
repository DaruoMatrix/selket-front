

export class User {
   
    cin:   String;
    first_name:   String;
    last_name:  String;
    password :String;
    email: String;
    phone: String;
    has_bank_account : Boolean;
    credit: {
      amount :Number;
      credit_reason :String;
      hasCredit : Boolean;
      credit_amount : Number;
    };
    
    job:{
      has_job: Boolean;
      job_type: String;
      salary:Number;
      job_sector : String;
      jobless_years : Number;
      
    };
    
    marital_status :{
        status:String;
        children_number:Number;
        
    };
    material_owns : {
      owns_car : Boolean;
      owns_house : Boolean;
      tenant_house : Boolean;
      tenant_amount:Number;
    }
    }
    
    
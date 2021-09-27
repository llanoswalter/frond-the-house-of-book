import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserServices } from 'src/app/services/userServices';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['../../app.component.css','./reset-password-form.component.css'],
  providers: [UserServices]

})
export class ResetPasswordFormComponent implements OnInit {
  public user: User;
  public status : string;

  constructor(
    private _userServices: UserServices

  ) {
    this.user=new User(1, "", "", "", "", "")
    this.status = "";

   }

  ngOnInit(): void {
  }
  onSubmit(form:any){
    this._userServices.registe(this.user).subscribe(
      Response=>{
        if(Response.status == "succes"){
          this.status = Response.status 
          console.log(Response);
        }else{
          this.status = 'error'
        }
        form.reset()
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserServices } from 'src/app/services/userServices';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../app.component.css', './register.component.css'],
  providers: [UserServices]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public status : string;
  constructor(
    private _router: Router,
    private _rute: ActivatedRoute,
    private _userServices: UserServices,

    ) {
    this.user=new User(1, "", "", "", "", "")
    this.status = "";
   }

  ngOnInit(): void {
  }
  onSubmit(form:any){
    this._userServices.registe(this.user).subscribe(
      Response=>{
        if(Response.status == "success"){
          this.status = Response.status 
          Swal.fire({
            icon: 'success',
            title: 'Se registro correctamente',
            text: 'Bienvenido ahora puedes ingresar!',
          })
          setTimeout(() => {
            this._router.navigate(['login']);

          }, 1000)
        }else{
          let error = "Vuelve a intentar mas tarde!"
          
          this.status = 'error'
          Swal.fire({
            icon: 'error',
            title: 'Se produjo un error',
            text: error,
          })
        }
        form.reset()
      },
      error =>{
        if(error.error.error.email != null){
          error = "El usuario ya esta registrado en nuestra base de datos!"
        }
        this.status = 'error'
        Swal.fire({
          icon: 'error',
          title: 'Se produjo un error',
          text: error,
        })
      }
    )
  }
}

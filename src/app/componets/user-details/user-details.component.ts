import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserServices } from 'src/app/services/userServices';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['../../app.component.css','./user-details.component.css'],
  providers: [UserServices]

})
export class UserDetailsComponent implements OnInit {

  public user: User;
  public status : string;
  public identity: any;
  public token: any;
  constructor(
    private _userServices: UserServices,
    private _router: Router,
    private _rute: ActivatedRoute

    ) {
    this.user= new User(1, "", "", "", "", "")
    this.status = "";
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
   }

  ngOnInit(): void {
    this.getUser();
    
  }
  getUser(){
    this._userServices.getUser(this.identity.sub, this.token).subscribe(
      Response=>{
        if(Response.status == "success"){
          this.user = Response.user
          localStorage.setItem('identity', JSON.stringify(this.identity));

        }
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  onSubmit(form:any){
    this._userServices.updateUser(this.user, this.token).subscribe(
      Response=>{
        if(Response.status == "success"){
          this.status = Response.status 
          Swal.fire({
            icon: 'success',
            title: 'Se actualizo correctamente',
            text: 'Puedes continuar!',
          })
          this.getUser();
        }else{
          this.status = 'error'
          Swal.fire({
            icon: 'error',
            title: 'Se produjo un error',
            text: 'Vuelve a intentar mas tarde!',
          })
        }
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  deleteUser(){
    Swal.fire({
      title: 'Seguro de deseas desactivar la cuenta?',
      text: "Si borras tu cuneta no la podras recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#36276c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userServices.deleteUser(this.user.id, this.token).subscribe(
          Response=>{
            if(Response.status == "success"){
              Swal.fire(
                'Se borro correctametne!',
                'Hasta pronto.',
                'success'
              )
              localStorage.removeItem('token')
              localStorage.removeItem('identity')
              setTimeout(() => {
                this._router.navigate(['login']);

              }, 1000)
            }else{
              Swal.fire(
                'Se profujo un error!',
                'Volver a intentar mas tarde.',
                'error'
              )
            }
          },
          error =>{
            console.log(<any>error);
          }
        )

      }
    })
  }
}

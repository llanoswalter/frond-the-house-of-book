import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserServices } from 'src/app/services/userServices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.css','./login.component.css'],
  providers: [UserServices]

})
export class LoginComponent implements OnInit {
  public user: User;
  public token : any;
  public identity: any;
  constructor(
    private _userServices: UserServices,
    private _router: Router,
    private _rute: ActivatedRoute

  ) {
    this.user=new User(1, "", "", "", "", "")

   }

  ngOnInit(): void {
    this.logout()
  }
  onSubmit(form:any){
    this._userServices.signup(this.user).subscribe(
      Response=>{
        if(Response.status != "error"){
            this.token = Response;
            this._userServices.signup(this.user, true).subscribe(
              Response=>{
                this.identity= Response;
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Bienvenido',
                  showConfirmButton: false,
                  timer: 1500
                })
                setTimeout(() => {
                  this._router.navigate(['inicio']);

                }, 1000)
                
            
              },
              error =>{
                console.log(<any>error);
              }
            )
        }else{
        }
        form.reset()
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  logout(){
    this._rute.params.subscribe(params=>{
      let logout = +params['sure'];
     
      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;

        this._router.navigate(['login']);
      }
    })
  }
}

import { Component, OnInit, DoCheck } from '@angular/core';
import { UserServices } from 'src/app/services/userServices';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../../../app.component.css','./footer.component.css'],
  providers: [UserServices]
})
export class FooterComponent implements OnInit, DoCheck {
  public token: any;
  public identity: any;

  constructor(
    private _router: Router,
    private _userServices : UserServices

  ) {

    this.loadUser();
  }

  ngOnInit(): void {
    
  }
  ngDoCheck(){
    this.loadUser();
  }
  loadUser(){
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();

  }
  getBook(id:any, title:any){
   
    localStorage.setItem('book', id);
    let url= window.location.href.includes('libro')
    if(url){
      location.reload();
    }else{
      this._router.navigate([`libro/${title}`]);
    }

  }
  getAuthor(id:any){
    let filtro = id;
    let url= window.location.href.includes('buscar')
    localStorage.setItem('filtro', filtro);
    if(url){
      location.reload();
    }else{
      this._router.navigate([`buscar`]);
    }
  }

}

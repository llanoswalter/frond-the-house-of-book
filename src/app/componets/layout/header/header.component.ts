import { Component, OnInit, DoCheck } from '@angular/core';
import { UserServices } from 'src/app/services/userServices';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../app.component.css','./header.component.css'],
  providers: [UserServices]
})
export class HeaderComponent implements OnInit, DoCheck {
  public token: any;
  public identity: any;
  public search :any ;
  public bookSearch: any;
  constructor(
    private _userServices : UserServices,
    private _router: Router,
    private _rute: ActivatedRoute
  ) { 
    this.loadUser();
    this.search = new Search("");
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
  onSubmit(form:any){
    let filtro = this.search.text.replace(/\s/g,"+");
    let url= window.location.href.includes('buscar')
    localStorage.setItem('filtro', filtro);
    form.reset();
    if(url){
      location.reload();
    }else{
      this._router.navigate([`buscar/`]);
    }
    
  }
}
export class Search {
  constructor(
    public text:string
  ){

  }
}

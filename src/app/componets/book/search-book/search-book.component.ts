import { Component, OnInit, Input } from '@angular/core';
import { BookServices } from 'src/app/services/bookServices';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Book } from 'src/app/models/Book';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['../../../app.component.css','./search-book.component.css'],
  providers: [BookServices]
})
export class SearchBookComponent implements OnInit {
  p: number = 1;
  public bookSearch: any;
  public Books: Array<Book>;
  public status: boolean = false;
  constructor(
    private _spiner: NgxSpinnerService,
    private _bookServices: BookServices,
    private _router: Router,
    private _rute: ActivatedRoute
  ) { 
    this.Books= [];
  }

  ngOnInit(): void {
    this._spiner.show();
    let filtro = localStorage.getItem('filtro');

   
    this._bookServices.searchBook(filtro).subscribe(
      Response=>{
         this.Books= Response.docs
         
         if(Object.keys(this.Books).length == 0 ){
            this.status  = true;           
         }
         setTimeout(() => {
          this._spiner.hide();
        }, 1);
      },
      error=>{
        console.log(<any>error);
        
      }
      
    )
  }
  detailsBook(id:any, title:any){
    
    localStorage.setItem('book', id);
    this._router.navigate([`libro/${title}`]);

  }
}

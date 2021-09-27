import { Component, OnInit } from '@angular/core';
import { BookServices } from 'src/app/services/bookServices';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [BookServices]
})
export class DetailsComponent implements OnInit {
  public book: any;
  public autores: any;
  public description: any;
  public people: any;
  public typeOfBook: any;
  constructor(
    private _spiner: NgxSpinnerService,
    private _BookServices: BookServices
  ) {
    this.book = []
   }

  ngOnInit(): void {
    this._spiner.show();

    let libro= localStorage.getItem('book');
    this._BookServices.oneBook(libro).subscribe(
      Response=>{
          this.book= Response;
          
          let idAuthor= this.book.authors != undefined ? this.book.authors[0].key: null;
          let idWork= this.book.works != undefined ? this.book.works[0].key : null;
          if(idAuthor != null){
            this._BookServices.author(idAuthor).subscribe(
              Response=>{
                this.autores= Response.name;

              },
              error=>{
                console.log(<any>error);
                
              }
            );
          }
          if(idWork != null){

            this._BookServices.detailBook(idWork).subscribe(
              Response=>{
                this.description= Response.description != undefined ? Response.description: [`Por el momento no disponemos de descripción para este libro`] ;
                this.people = Response.subject_people != undefined ? Response.subject_people : [`Por el momento no disponemos de personajes para mostrar`] ;
                this.typeOfBook = Response.subjects != undefined ? Response.subjects : [`Por el momento no disponemos de temas para mostrar`] ;
                
              },
              error=>{
                console.log(<any>error);
                
              }
            )
          }else{
            this.description= [`Por el momento no disponemos de descripción para este libro`] ;
            this.people =  [`Por el momento no disponemos de personajes para mostrar`] ;
            this.typeOfBook =  [`Por el momento no disponemos de temas para mostrar`] ;

          }
          setTimeout(() => {
            this._spiner.hide();
          }, 1000);
      },
      error=>{
        console.log(<any>error);
        
      }
    )

  }

}

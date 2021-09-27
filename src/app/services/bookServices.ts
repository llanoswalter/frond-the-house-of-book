import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { globalServices } from "./globalServices";

@Injectable()
export class BookServices{
    public url: string;
    public identity: any;
    public token : any;
    constructor(
        public http: HttpClient
    ){
        this.url = globalServices.url;
    }


    searchBook(dato:any= null):Observable<any>{
        return this.http.get(`http://openlibrary.org/search.json?q=${dato}`);
    }
    getImage(id:any):Observable<any>{
        
        return this.http.get(`http://covers.openlibrary.org/b/isbn/${id}-s.jpg`);
    }
    oneBook(id:any):Observable<any>{
        
        return this.http.get(`https://openlibrary.org/isbn/${id}.json`);
    }
    author(id:any):Observable<any>{
        return this.http.get(`https://openlibrary.org${id}.json`)
    }
    detailBook(id:any):Observable<any>{
        return this.http.get(`https://openlibrary.org${id}.json`)
    }
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity') ! );
        if(identity && identity != undefined && identity != null ){
            this.identity= identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }
    getToken(){
        let token = localStorage.getItem('token');
        if(token && token != undefined && token != null ){
            this.token= token;
        }else{
            this.token = null;
        }
        return this.token;
    }

}
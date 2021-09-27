import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from "../models/User";
import { globalServices } from "./globalServices";

@Injectable()
export class UserServices{
    public url: string;
    public identity: any;
    public token : any;
    constructor(
        public http: HttpClient
    ){
        this.url = globalServices.url;
    }

    registe(user:User ): Observable<any> {
        let json= JSON.stringify(user);
        let params = `json= ${json}`;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this.http.post(this.url+'register', params, {headers: headers});
    }
    signup(user:any, getToken:any = null ): Observable<any> {
        if(getToken != null){
            user.getToken = true;
        }
        let json= JSON.stringify(user);
        let params = `json= ${json}`;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this.http.post(this.url+'login', params, {headers: headers});
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
    getUser(id:number, token :any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token);;
        return this.http.get(this.url+'user/'+id, {headers: headers});
    }
    updateUser(user:User, token:any ): Observable<any> {
        let json= JSON.stringify(user);
        let params = `json= ${json}`;
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token);
        return this.http.put(this.url+'user', params, {headers: headers});
    }
    deleteUser(id:number, token:any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                        .set('Authorization', token);
        
        return this.http.delete(this.url+'user/'+id, {headers: headers});
    }
}
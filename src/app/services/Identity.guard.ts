import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserServices } from './userServices';

@Injectable()
export class identityGuard implements CanActivate{
    constructor(
        private _router: Router,
        private _userServices: UserServices
    ){

    }
    canActivate(){
        let identity = this._userServices.getToken();
        if(identity){
                return true;
        }else{
            this._router.navigate(['login']);
            return false;
        }
    }
    
}


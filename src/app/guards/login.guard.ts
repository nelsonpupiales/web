import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataApiService } from '../services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private dataService: DataApiService, private router: Router){

  }

  canActivate() {

    let token = this.dataService.getToken()
    console.log("token -> ",token);

    if(token){
      return true;
    }else{
      
      this.router.navigate(['/user/login']);
      return false;

    }
   

    
  }
  
}

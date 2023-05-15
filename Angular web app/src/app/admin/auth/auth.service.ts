import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/common-ui-models/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  _baseURL = environment.baseurl;
   headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

findUserByUserId(userName:string): Observable<User>{
  const headers =this.headers;
  return this.httpClient.get<User>(this._baseURL+"/api/getUserByUserId/"+userName)
}

registerUser(user:User) :Observable<User>{
  const headers =this.headers;

 return this.httpClient.post<User>(this._baseURL+"/api/registerUser",JSON.stringify(user), {
      headers: headers
    });

  };
loginUser(user:User) :Observable<User>{
    const headers =this.headers;

   return this.httpClient.post<User>(this._baseURL+"/api/loginUser",JSON.stringify(user), {
        headers: headers
      });

    };
}

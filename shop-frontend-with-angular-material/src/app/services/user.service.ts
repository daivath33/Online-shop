import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  private baseUrl="http://localhost:8080/api/user";

  private registerUrl = `${this.baseUrl}/register`;
  private loginUrl = `${this.baseUrl}/login`;
  private logoutUrl = `${this.baseUrl}/logout`;
  private userUrl = `${this.baseUrl}`;

  private loginStatus = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  getUsersList(): Observable<User[]>{
  return this.httpClient.get<User[]>(this.userUrl);
  }

  addUser(user: User): Observable<User> {   
  return this.httpClient.post<User>(this.registerUrl, user);
  }

  login(email: string='', password: string=''): Observable<any> {
    return this.httpClient.get<any>(this.loginUrl, {params: {email, password}}).pipe(map(result=>{
    this.user = result;

    if(result) {
     this.loginStatus.next(true);      
    }
    return result;
  }));
  }

  logoutUser(): Observable<any>{
    return this.httpClient.get<any>(this.logoutUrl);
  }

  logout(){
    this.logoutUser().subscribe();
    this.loginStatus.next(false);
    this.user = null;
  }

  get isLoggedIn(){
    return this.loginStatus.asObservable();
  }
  
  getUsderData(){
    return this.user;
  }

  isAdmin(){
    return this.user?.role.toUpperCase() === 'ADMIN';
  }

  isAuthenticated(){
    const promise = new Promise(
      (resolve, reject) => {
          resolve(!!this.user);
      }
  );
  return promise;
  }

  isAdminPromise(){
    const promise = new Promise(
      (resolve, reject) => {
          resolve(this.isAdmin());
      }
  );
  return promise;
  }
}
import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    constructor(private http: HttpClient) { }
    url:string='http://localhost:8080/api/auth'

    login(userInfo:any):Observable<any>{
        return this.http.post<any>(this.url+"/login", userInfo)
    }
}
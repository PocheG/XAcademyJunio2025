import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../components/table/models/Pagination';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }
  url:string='http://localhost:8080/api'

  getPaginatedPlayers(pagination:Pagination<Player>,fullName:string):Observable<any>{
    let params:any={
      "page":pagination.page.toString(),
    }
    if(pagination.page){params["page"]=pagination.page}
    if(pagination.orderDirection){params["orderDirection"]=pagination.orderDirection}
    if(pagination.pageSize)params["pageSize"]=pagination.pageSize
    if(fullName!=="")params["fullName"]=fullName
    
    return this.http.get<any>(this.url+"/players",{params})

  }
}

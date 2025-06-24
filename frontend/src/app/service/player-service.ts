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
  url:string='http://localhost:8080/api/players'

  getVersions():Observable<string[]>{
    return this.http.get<string[]>(this.url+"/versions")
  }

  getTeams():Observable<string[]>{
    return this.http.get<string[]>(this.url+"/teams")
  }

  getPositions():Observable<string[]>{
    return this.http.get<string[]>(this.url+"/positions")
  }

  getPaginatedPlayers(pagination:Pagination<Player>,fullName:string, advanceFilters:any):Observable<any>{
    let params:any={
      "page":pagination.page.toString(),
    }
    if(pagination.page){params["page"]=pagination.page}
    if(pagination.orderDirection){params["orderDirection"]=pagination.orderDirection}
    if(pagination.pageSize)params["pageSize"]=pagination.pageSize
    if(fullName!=="")params["fullName"]=fullName
    if(advanceFilters.fifaUpdate)params['fifaUpdate']=advanceFilters.fifaUpdate
    if(advanceFilters.position)params['position']=advanceFilters.position
    if(advanceFilters.version)params['fifaVersion']=advanceFilters.version
    if(advanceFilters.team)params['team']=advanceFilters.team
    if(advanceFilters.minOverall)params['minOverall']=advanceFilters.minOverall
    if(advanceFilters.minPace)params['minPace']=advanceFilters.minPace
    if(advanceFilters.minShooting)params['minShooting']=advanceFilters.minShooting
    if(advanceFilters.minPassing)params['minPassing']=advanceFilters.minPassing
    if(advanceFilters.minDefending)params['minDefending']=advanceFilters.minDefending
    if(advanceFilters.minDribbling)params['minDribliing']=advanceFilters.minDribbling
    
    return this.http.get<any>(this.url,{params})

  }

}
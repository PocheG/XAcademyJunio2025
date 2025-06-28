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

  getNationalities():Observable<string[]>{
    return this.http.get<string[]>(this.url+"/nationalities")
  }

  getPreferredFoots():Observable<string[]>{
    return this.http.get<string[]>(this.url+"/foot")
  }

  getBodyTypes():Observable<string[]>{
    return this.http.get<string[]>(this.url+"/bodyType")
  }

  getTraits():Observable<string[]>{
    return this.http.get<string[]>(this.url+"/traits")
  }

  getPaginatedPlayers(pagination:Pagination<Player>,longName:string, advanceFilters:any):Observable<any>{
    let params:any={
      "page":pagination.page.toString(),
    }
    if(pagination.page){params["page"]=pagination.page}
    if(pagination.orderDirection){params["orderDirection"]=pagination.orderDirection}
    if(pagination.pageSize)params["pageSize"]=pagination.pageSize
    if(longName!=="")params["longName"]=longName
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

  getPlayersCSV(pagination:Pagination<Player>,longName:string, advanceFilters:any):Observable<any>{
    let params:any={
      "page":pagination.page.toString(),
    }
    if(pagination.page){params["page"]=pagination.page}
    if(pagination.orderDirection){params["orderDirection"]=pagination.orderDirection}
    if(pagination.pageSize)params["pageSize"]=pagination.pageSize
    if(longName!=="")params["longName"]=longName
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
    
    return this.http.get(this.url+'/csv', {
      params,
      responseType: 'blob' 
    });

  }

  getPlayerById(id:number):Observable<any>{
    return this.http.get(this.url+`/${id}`)
  }

  updatePlayer(id:number, newData:any): Observable<any>{
    return this.http.put(this.url+`/${id}`,newData)
  }

}
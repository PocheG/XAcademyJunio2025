import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  private getAuthHeaders(): HttpHeaders {
    
    const token = localStorage?.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  getVersions():Observable<string[]>{
    const headers=this.getAuthHeaders()
    return this.http.get<string[]>(this.url+"/versions",{headers})
  }

  getTeams():Observable<string[]>{
    const headers=this.getAuthHeaders()
    return this.http.get<string[]>(this.url+"/teams",{headers})
  }

  getPositions():Observable<string[]>{
    const headers=this.getAuthHeaders()
    return this.http.get<string[]>(this.url+"/positions",{headers})
  }

  getNationalities():Observable<string[]>{
    const headers=this.getAuthHeaders()
    return this.http.get<string[]>(this.url+"/nationalities",{headers})
  }

  getPreferredFoots():Observable<string[]>{
    const headers=this.getAuthHeaders()
    return this.http.get<string[]>(this.url+"/foot",{headers})
  }

  getBodyTypes():Observable<string[]>{
    const headers=this.getAuthHeaders()
    return this.http.get<string[]>(this.url+"/bodyType",{headers})
  }

  getTraits():Observable<string[]>{
    const headers=this.getAuthHeaders()
    return this.http.get<string[]>(this.url+"/traits",{headers})
  }

  getPaginatedPlayers(pagination:Pagination<Player>,longName:string, advanceFilters:any):Observable<any>{
    let params:any={
      "page":pagination.page.toString(),
    }
    if(pagination.page){params["page"]=pagination.page}
    if(pagination.orderDirection){params["orderDirection"]=pagination.orderDirection}
    if(pagination.pageSize)params["pageSize"]=pagination.pageSize
    if(longName!=="")params["longName"]=longName
    if(advanceFilters.position)params['position']=advanceFilters.position
    if(advanceFilters.version)params['fifaVersion']=advanceFilters.version
    if(advanceFilters.team)params['team']=advanceFilters.team
    if(advanceFilters.minOverall)params['minOverall']=advanceFilters.minOverall
    if(advanceFilters.minPace)params['minPace']=advanceFilters.minPace
    if(advanceFilters.minShooting)params['minShooting']=advanceFilters.minShooting
    if(advanceFilters.minPassing)params['minPassing']=advanceFilters.minPassing
    if(advanceFilters.minDefending)params['minDefending']=advanceFilters.minDefending
    if(advanceFilters.minDribbling)params['minDribliing']=advanceFilters.minDribbling
    
    const headers=this.getAuthHeaders()
    return this.http.get<any>(this.url,{headers,params})

  }

  getPlayersCSV(pagination:Pagination<Player>,longName:string, advanceFilters:any):Observable<any>{
    let params:any={
      "page":pagination.page.toString(),
    }
    if(pagination.page){params["page"]=pagination.page}
    if(pagination.orderDirection){params["orderDirection"]=pagination.orderDirection}
    if(pagination.pageSize)params["pageSize"]=pagination.pageSize
    if(longName!=="")params["longName"]=longName
    if(advanceFilters.position)params['position']=advanceFilters.position
    if(advanceFilters.version)params['fifaVersion']=advanceFilters.version
    if(advanceFilters.team)params['team']=advanceFilters.team
    if(advanceFilters.minOverall)params['minOverall']=advanceFilters.minOverall
    if(advanceFilters.minPace)params['minPace']=advanceFilters.minPace
    if(advanceFilters.minShooting)params['minShooting']=advanceFilters.minShooting
    if(advanceFilters.minPassing)params['minPassing']=advanceFilters.minPassing
    if(advanceFilters.minDefending)params['minDefending']=advanceFilters.minDefending
    if(advanceFilters.minDribbling)params['minDribliing']=advanceFilters.minDribbling
    
    const headers=this.getAuthHeaders()
    return this.http.get(this.url+'/csv', {
      headers,
      params,
      responseType: 'blob' 
    });

  }

  getPlayerById(id:number):Observable<any>{
    const headers=this.getAuthHeaders()
    return this.http.get(this.url+`/${id}`,{headers})
  }

  updatePlayer(id:number, newData:any): Observable<any>{
    const headers=this.getAuthHeaders()
    return this.http.put(this.url+`/${id}`,newData,{headers})
  }
  insertNewPlayer(newData:any): Observable<any>{
    const headers=this.getAuthHeaders()
    return this.http.post(this.url,newData,{headers})
  }

}
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../../service/player-service';
import { Player } from '../../../models/player';
import { columnSetting } from '../../../components/table/models/columnsSetting';
import { Pagination } from '../../../components/table/models/Pagination';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss'
})
export class PlayersListComponent implements OnInit{

  filtrosForm:FormGroup

  versions:string[]=[]
  teams:string[]=[]
  positions:string[]=[]

  constructor(private playerService: PlayerService,
    private fb:FormBuilder,
  ){
    this.filtrosForm = this.fb.group({
      version: [''],
      team: [''],
      position: [''],
      minOverall: [null],
      minPace: [null],
      minShooting: [null],
      minDefending: [null],
      minPassing: [null],
      minDribbling: [null],
      fifaUpdate:[false]
    });
  }
  subscription = new Subscription

  longName=''

  columnsSetting:columnSetting<Player>[]=[{
    label:"Jugador",
    key:"longName",
    sortable:true,
    width:"200px"
  },{
    label:"Version",
    key:"fifaVersion",
    sortable:true,
    width:"50px"
  },{
    label:"Actualizado",
    key:"fifaUpdate",
    sortable:true,
    width:"50px"
  },{
    label:"Equipo",
    key:"team",
    sortable:true,
    width:"80px"
  },{
    label:"Posicion",
    key:"positions",
    sortable:true,
    width:"50px"
  },{
    label:"Overall",
    key:"overall",
    sortable:true,
    width:"50px"
  },{
    label:"RIT",
    key:"pace",
    sortable:true,
    width:"50px"
  },{
    label:"TIR",
    key:"shooting",
    sortable:true,
    width:"50px"
  },{
    label:"PAS",
    key:"passing",
    sortable:true,
    width:"50px"
  },{
    label:"REG",
    key:"dribbling",
    sortable:true,
    width:"50px"
  },{
    label:"DEF",
    key:"defending",
    sortable:true,
    width:"50px"
  },{
    label:"FIS",
    key:"physic",
    sortable:true,
    width:"50px"
  },
]

  pagination:Pagination<Player>={
    page:1,
    pageSize:20,
    totalPages:0,
    orderBy:"id",
    orderDirection:"asc"
  }
  rows:Player[]=[] 
  onPageChange(page: number) {
    this.pagination.page = page;
    this.getPaginatedPlayer();
  }
  
  onOrderChange(event: { orderBy: keyof Player; orderDirection: 'asc' | 'desc' }) {
    this.pagination.orderBy = event.orderBy;
    this.pagination.orderDirection = event.orderDirection;
    this.getPaginatedPlayer();
  }
  resetFilters() {
    this.isSidebarOpen=false
    this.filtrosForm.reset(); 
    this.longName = '';    
    this.getPaginatedPlayer(); 
  }

  error:boolean=false
  isLoading:boolean=false
  isSidebarOpen:boolean=false;
  getPaginatedPlayer(){
    const filters= this.filtrosForm.value
    this.isSidebarOpen=false
    this.error=false
    this.isLoading=true
    this.subscription.add(this.playerService.getPaginatedPlayers(
      this.pagination,this.longName, filters).subscribe({
      next:res=>{
        this.rows=res.results.map((player: any)=> new Player(player))
        this.pagination={
          ...this.pagination,
          totalPages:res.pagination.totalPages,
          
        }
      },
      error:error=>{
        error=true
      },
      complete:()=>{
        this.isLoading=false
      }
    }))
  } 

  getPlayersCSV(){
    const filters= this.filtrosForm.value
    this.isSidebarOpen=false
    this.subscription.add(this.playerService.getPlayersCSV(
      this.pagination,this.longName, filters).subscribe({
      next:(blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jugadores.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error:error=>{
        console.error(error)
      }
    }))
  } 

  openSibebar(){
    this.isSidebarOpen=true
  }
  getVersions(){ 
    this.subscription.add(this.playerService.getVersions().subscribe({
      next:res=>{
        this.versions=[...res]
      },
      error:error=>{
        console.error(error)
      }
    }))
  }
  getTeams(){ 
    this.subscription.add(this.playerService.getTeams().subscribe({
      next:res=>{
        this.teams=res
      },
      error:error=>{
        console.error(error)
      }
    }))
  }
  getPositions(){ 
    this.subscription.add(this.playerService.getPositions().subscribe({
      next:res=>{
        this.positions=res
      },
      error:error=>{
        console.error(error)
      }
    }))
  }

  ngOnInit(): void {
    this.getPositions()
    this.getTeams()
    this.getVersions()
    this.getPaginatedPlayer()
  }
  getButtonsClass(){
    return this.isLoading?'buttonDisabled':""
  }
}

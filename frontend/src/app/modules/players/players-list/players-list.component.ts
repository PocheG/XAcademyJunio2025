import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PlayerService } from '../../../service/player-service';
import { Player } from '../../../models/player';
import { columnSetting } from '../../../components/table/models/columnsSetting';
import { Pagination } from '../../../components/table/models/Pagination';
import { FormControl, FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss'
})
export class PlayersListComponent implements OnInit{

  constructor(private playerService: PlayerService){}
  subscription = new Subscription

  fullName = new FormControl('');
  advancedFilters= new FormGroup({
    version:new FormControl('',[
    ])
  })
  columnsSetting:columnSetting<Player>[]=[{
    label:"Jugador",
    key:"longName",
    sortable:true
  },{
    label:"Version",
    key:"fifaVersion",
    sortable:true
  },{
    label:"Actualizado",
    key:"fifaUpdate",
    sortable:true
  },{
    label:"Equipo",
    key:"team",
    sortable:true
  },{
    label:"Posicion",
    key:"positions",
    sortable:true
  },{
    label:"P. General",
    key:"overall",
    sortable:true
  },{
    label:"RIT",
    key:"pace",
    sortable:true
  },{
    label:"TIR",
    key:"shooting",
    sortable:true
  },{
    label:"PAS",
    key:"passing",
    sortable:true
  },{
    label:"REG",
    key:"dribbling",
    sortable:true
  },{
    label:"DEF",
    key:"defending",
    sortable:true
  },{
    label:"FIS",
    key:"physic",
    sortable:true
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

  isSidebarOpen:boolean=false;
  getPaginatedPlayer(){
    console.log(this.isSidebarOpen)
    console.log(this.fullName)
    this.subscription.add(this.playerService.getPaginatedPlayers(
      this.pagination,this.fullName.value!.toString()).subscribe({
      next:res=>{
        this.rows=res.results.map((player: any)=> new Player(player))
        this.pagination={
          ...this.pagination,
          totalPages:res.pagination.totalPages,
          
        }
      },
      error:error=>{
        console.error(error)
      }
    }))
  }

  ngOnInit(): void {
    this.getPaginatedPlayer()
  }
}

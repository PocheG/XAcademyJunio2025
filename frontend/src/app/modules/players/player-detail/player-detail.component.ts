import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../service/player-service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from '../../../models/player';
import Chart from 'chart.js/auto'
@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.scss'
})
export class PlayerDetailComponent implements OnInit {
  subscription= new Subscription
  requestError:number|null=null
  isLoading:boolean=true
  player:Player|null=null
  constructor(
    private playerService: PlayerService,
    private activeRoute: ActivatedRoute){}

  getPlayer(id:number){
    this.isLoading=true
    this.subscription.add(this.playerService.getPlayerById(id).subscribe({
      next:res => {
        this.player=new Player(res)
      },
      error:error=>{
        this.requestError=error.status
      },
      complete:()=>{
        setTimeout(() => {
        this.isLoading=false
          this.buildCharts();
        }, 3000);
      }
    }))

  }

  stats:{
    title:string,
    labels:string[],
    values:number[]

  }[]=[]
  buildCharts(){
    this.stats=[{
      title:"Ataque",
      labels:["Precisión de centro","Definición", "Precisión cabezasos","Pases cortos", "Voleas"],
      values:[this.player?.attackingCrossing??0, 
          this.player?.attackingFinishing??0,
          this.player?.attackingHeadingAccuracy??0,
          this.player?.attackingShortPassing??0,
          this.player?.attackingVolleys??0
      ]
      },{
          title:"Overall",
          labels:["Velocidad","Remates","Pases", "Regate","Físico", "Defensa",],
          values:[this.player?.pace??0, 
            this.player?.shooting??0,
            this.player?.passing??0,
            this.player?.dribbling??0,
            this.player?.physic??0,
            this.player?.defending??0
          ]

      }   
]
    
    this.stats.forEach(stat => {
      new Chart(
        document.getElementById(stat.title) as HTMLCanvasElement,{
          type:'radar',
          data:{
            
            labels: stat.labels,
            datasets:[{
              label:stat.title,
              data:stat.values,
              fill: true,
              backgroundColor: 'rgba(141, 246, 134, 0.3)',
              borderColor: '#70F468',
              pointBackgroundColor: '#70F468',
            }]
          },
          options:{
            responsive:true,
            scales:{
              r:{
                pointLabels: {
                  callback: function(label) {
                    return label.split(' ');
                  },
                  font: {
                    size: 14
                  },
                  color: '#333'
                },
                angleLines:{
                  display:true,
                  color:"#fff",
                  lineWidth:1
                },
                ticks:{
                  stepSize:25
                },
                grid: {
                  color: '#ddd', 
                  lineWidth: 1
                },
                max:100,
                min:0
              },
            },
            elements: {
              line: {
                borderWidth: 3,
                tension: 0
              },
              point: {
                radius: 5,
                hoverRadius: 7
              }
            }
          }
        }
      );
  })}


  ngOnInit(): void {
    const idParam = this.activeRoute.snapshot.paramMap.get('id');
    this.getPlayer(Number(idParam))
  }

}

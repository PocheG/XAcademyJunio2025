import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PlayerService } from '../../../service/player-service';
import { Player } from '../../../models/player';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { version } from 'os';
import { get } from 'http';
import { ConfirmationModalService } from '../../../layout/confirmation-modal/service/confirmationModalService';
import { ModalIconEnum } from '../../../layout/confirmation-modal/models/ModalProps';
import { loadingScreenService } from '../../../layout/loading-screen/service/loadingScreenService';
import { response } from 'express';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent implements OnInit{

  subscription= new Subscription()

  playerForm:FormGroup
  isLoading:boolean=true
  requestError:number|null=null

  player:Player=new Player()
  constructor(
    private playerService: PlayerService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private confirmationModalService: ConfirmationModalService,
    private loadingService: loadingScreenService,
    private router: Router
  ){ 
    this.player=new Player()
    console.log(this.player)
    this.playerForm = this.fb.group({
      longName:[this.player.longName,[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      nationality:[this.player.nationality,[
        Validators.required
      ]],
      fifaVersion: [this.player.fifaVersion,[
        Validators.required
      ]],
      team: [this.player.team,[
        Validators.required
      ]],
      reputation:[this.player.reputation,[
        Validators.required,
        Validators.max(5),
        Validators.min(1)
      ]],
      positions: [this.player.positions,[
        Validators.required,
      ]],
      age:[this.player.age,[
        Validators.required,
        Validators.max(40),
        Validators.min(18)
      ]],
      heightCm:[this.player.heightCm,[
        Validators.required,
        Validators.min(100),
        Validators.max(230)
      ]],
      weightKg:[this.player.weightKg,[
        Validators.required,
      ]],
      playerFaceUrl:[this.player.playerFaceUrl,[
        Validators.required
      ]],
      preferredFoot:[this.player.preferredFoot,[
        Validators.required
      ]],
      traits:[this.player.traits,[
        Validators.required
      ]],
      bodyType:[this.player.bodyType,[
        Validators.required
      ]],
      attackingCrossing:[this.player.attackingCrossing,[
        Validators.required,
        Validators.min(1),
        Validators.max(99)
      ]],
      attackingFinishing:[this.player.attackingFinishing,[
        Validators.required,
        Validators.min(1),
        Validators.max(99)
      ]],
      attackingHeadingAccuracy:[this.player.attackingHeadingAccuracy,[
        Validators.required,
        Validators.min(1),
        Validators.max(99)
      ]],
      attackingShortPassing:[this.player.attackingShortPassing,[
        Validators.required,
        Validators.min(1),
        Validators.max(99)
      ]],
      attackingVolleys:[this.player.attackingVolleys,[
        Validators.required,
        Validators.min(1),
        Validators.max(99)
      ]],
      pace: [this.player.pace,[
        Validators.required,
        Validators.min(1),
        Validators.max(99)
      ]],
      physic:[this.player.physic,[
        Validators.required,
        Validators.min(1),
        Validators.max(99)
      ]],
      shooting:[this.player.shooting,[
        Validators.required,
        Validators.min(1),
        Validators.max(99)
      ]],
      defending: [this.player.defending,[
        Validators.required,
        Validators.min(1),
        Validators.max(99)
      ]],
      passing: [this.player.passing,[
        Validators.required,
        Validators.min(1),
        Validators.max(99)
      ]],
      dribbling: [this.player.dribbling,[
        Validators.required,
        Validators.min(1),
        Validators.max(99)
      ]],
    });
   }

   getFieldError(field:string){
    //si el campo tiene errores y fue clickeado
    const fieldErrors= this.playerForm.get(field)?.errors
    if(this.playerForm.get(field)?.touched && fieldErrors){
      
      if(fieldErrors!['required']) return "Este campo es requerido"
      if(fieldErrors['min']) return `ESte campo no puede ser menor a ${fieldErrors['min'].min}`
      if(fieldErrors['max']) return `ESte campo no puede ser mayor a ${fieldErrors['max'].max}`


    }
    return ''
   }

  versions:string[]=[]
  teams:string[]=[]
  positions:string[]=[]
  preferredFoots:string[]=[]
  nationalities:string[]=[]
  traits: string[]=[]
  bodyTypes:string[]=[]

  getPlayer(id:number){
    this.subscription.add(this.playerService.getPlayerById(id).subscribe({
      next:res => {
        this.player=new Player(res)
        this.playerForm.patchValue(this.player); 
      },
      error:error=>{
        console.log(error)
        this.requestError=error.status
      },
      complete:()=>{
        setTimeout(() => {
        this.isLoading=false
        }, 3000);
      }
    }))
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
  getNationalities(){ 
    this.subscription.add(this.playerService.getNationalities().subscribe({
      next:res=>{
        this.nationalities=res
      },
      error:error=>{
        console.error(error)
      }
    }))
  }
  getPreferredFoots(){ 
    this.subscription.add(this.playerService.getPreferredFoots().subscribe({
      next:res=>{
        this.preferredFoots=res
        this.playerForm.patchValue(this.player); 
      },
      error:error=>{
        console.error(error)
      }
    }))
  }

  getBodyTypes(){ 
    this.subscription.add(this.playerService.getBodyTypes().subscribe({
      next:res=>{
        this.bodyTypes=res
      },
      error:error=>{
        console.error(error)
      }
    }))
  }

  getTraits(){ 
    this.subscription.add(this.playerService.getTraits().subscribe({
      next:res=>{
        this.traits=res
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

  handleSubmit(){
    if(this.playerForm.invalid){
      this.playerForm.markAllAsTouched()
      this.confirmationModalService.openModal({
        icon: ModalIconEnum.error,
        title:"Error en el formulario",
        message:"Revise los valores ingresados antes de continuar",
        accept:{
          title:"Aceptar",
          action:()=>{
            this.confirmationModalService.closeModal()
          }
        }
      })
    }else{
      this.confirmationModalService.openModal({
        title:"Confirmar edición",
        message:`¿Desea guardar los cambios sobre el/la jugador/a ${this.player.longName} en la versión ${this.player.fifaVersion}? Podra editar los cambios mas tarde.`,
        reject:{
          title:"Cancelar",
          action:()=>{
            this.confirmationModalService.closeModal()
          }
        },
        accept:{
          title:"Aceptar",
          action:()=>{
            this.confirmationModalService.closeModal()
            this.loadingService.showLoadingScreen('Guardando cambios...')
            this.playerService.updatePlayer(this.player.id,this.playerForm.value).subscribe(
              response=>{
                setTimeout(() => {
                this.loadingService.showLoadingScreen(null)
                }, 3000);
                this.confirmationModalService.openModal({
                  icon:ModalIconEnum.ok,
                  title:"Jugador actualizado",
                  message:"Se ha guardado la nueva información con éxito",
                  accept:{
                    title:"Aceptar",
                    action:()=>{
                      this.router.navigate(["detail",this.player.id], { relativeTo: this.activeRoute.parent })
                      this.confirmationModalService.closeModal()
                    }
                  }
                })
              },
              error=>{
                this.loadingService.showLoadingScreen(null)
                this.confirmationModalService.openModal({
                  icon:ModalIconEnum.error,
                  title:"Error",
                  message:"No se pudo confirmar la actualización. Intente de nuevo mas tarde",
                  accept:{
                    title:"Aceptar",
                    action:()=>{
                      this.confirmationModalService.closeModal()
                    }
                  }
                })
              }
            )
          },
        }
      })

    }
  }


  ngOnInit(): void {
    const idParam = this.activeRoute.snapshot.paramMap.get('id');
    this.getBodyTypes()
    this.getNationalities()
    this.getPositions()
    this.getPreferredFoots()
    this.getTeams()
    this.getTraits()
    this.getVersions()
    this.getPlayer(Number(idParam))
  }
  rangeValue:number=99

  getInputRangeColor(field:string){
    const value:number=this.playerForm.get(field)?.value
    const percentage:number=value/99
    
    const green:number=value===99?255:Math.round(255*(percentage))
    const red: number=value===0?255:Math.round(255*(1-percentage))

    return `rgb(${red}, ${green}, 0)`;
    
  }
}

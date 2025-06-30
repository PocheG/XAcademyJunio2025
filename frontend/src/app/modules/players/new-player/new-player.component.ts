import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Player } from '../../../models/player';
import { PlayerService } from '../../../service/player-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationModalService } from '../../../layout/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../layout/loading-screen/service/loadingScreenService';
import { ModalIconEnum } from '../../../layout/confirmation-modal/models/ModalProps';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrl: './new-player.component.scss'
})
export class NewPlayerComponent implements OnInit{

  subscription= new Subscription()

  playerForm:FormGroup

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
        Validators.min(1.00),
        Validators.max(2.30)
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
      if(fieldErrors['min']) return `Este campo no puede ser menor a ${fieldErrors['min'].min}`
      if(fieldErrors['max']) return `Este campo no puede ser mayor a ${fieldErrors['max'].max}`

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
        if(error.status===401){
          this.router.navigate([""])
        }
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
        title:"Confirmar registro",
        message:`¿Desea registrar a el/la jugador/a ${this.playerForm.get('longName')?.value} en la versión ${this.playerForm.get('fifaVersion')?.value}? Podra editarlo/a mas tarde.`,
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
            this.loadingService.showLoadingScreen('Registrando jugador...')
            this.playerService.insertNewPlayer(this.playerForm.value).subscribe(
              response=>{
                setTimeout(() => {
                this.loadingService.showLoadingScreen(null)
                this.confirmationModalService.openModal({
                  icon:ModalIconEnum.ok,
                  title:"Jugador registrado",
                  message:"Se ha confirmado el registro con éxito",
                  accept:{
                    title:"Aceptar",
                    action:()=>{
                      this.router.navigate(["detail",response.id], { relativeTo: this.activeRoute.parent })
                      this.confirmationModalService.closeModal()
                    }
                  }
                })

                }, 3000);
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
    if(!localStorage.getItem("token")){
      this.router.navigate([""])
    }
    const idParam = this.activeRoute.snapshot.paramMap.get('id');
    this.getBodyTypes()
    this.getNationalities()
    this.getPositions()
    this.getPreferredFoots()
    this.getTeams()
    this.getTraits()
    this.getVersions()
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

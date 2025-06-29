import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth-service';
import { Subscription } from 'rxjs';
import { ConfirmationModalService } from '../../../layout/confirmation-modal/service/confirmationModalService';
import { loadingScreenService } from '../../../layout/loading-screen/service/loadingScreenService';
import { Router } from '@angular/router';
import { ModalIconEnum } from '../../../layout/confirmation-modal/models/ModalProps';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  subscription = new Subscription
  
  userForm:FormGroup
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private confirmationModalService: ConfirmationModalService,
    private loadingService: loadingScreenService,
    private router: Router
  ){
  this.userForm = this.fb.group({
      userName:['',[
        Validators.required,
      ]],
      password:['',[
        Validators.required
      ]]})
    
  }
  getFieldError(field:string){
    //si el campo tiene errores y fue clickeado
    const fieldErrors= this.userForm.get(field)?.errors
    if(this.userForm.get(field)?.touched && fieldErrors){
      
      if(fieldErrors!['required']) return "Este campo es requerido"
      if(fieldErrors['min']) return `ESte campo no puede ser menor a ${fieldErrors['min'].min}`
      if(fieldErrors['max']) return `ESte campo no puede ser mayor a ${fieldErrors['max'].max}`


    }
    return ''
   }
  handleSubmit(){
    if(!this.userForm.invalid){
      this.loadingService.showLoadingScreen('Iniciando sesión...')
      this.subscription.add(this.authService.login(this.userForm.value).subscribe({
        next:res=>{
          console.log(res)
          localStorage.setItem('token',res.token);
          this.loadingService.showLoadingScreen(null)
          this.router.navigate(["/players",])

        },
        error:error=>{
          console.log(error)
          this.loadingService.showLoadingScreen(null)
          this.confirmationModalService.openModal({
            icon:ModalIconEnum.error,
            title:"Error al autenticar",
            message:"El usuario y/o la contraseña son incorrectos",
            accept:{
              title:"Aceptar",
              action:()=>{
                this.confirmationModalService.closeModal()
              }
            }
          })
        }
      }))
    }
  }

}

import { Component, HostListener, Input } from '@angular/core';
import { NavigationItem } from '../models/navigationsItems';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() navigationItems: NavigationItem[]

  constructor(private router:Router){
    this.navigationItems=[]
  }
  
  clickedItem:number|null=null
  isUserOptionsOpen:boolean=false
  onItemClick(index: number): void {
    if(!this.clickedItem && this.clickedItem!==0){
      this.clickedItem = index;
    }
    else{
      this.clickedItem=null
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const clickedInside = target.closest('.navigationItem');

    if (!clickedInside) {
      this.clickedItem = null;
    }
  }

  navigateTo(route:string){
    this.router.navigate([route]);
    this.clickedItem=null
  }
  getArrowClasses(i: number): string {
    return this.clickedItem === i ? 'arrowIcon arrowUp' : 'arrowIcon';
  }

  closeSesion(){
    setTimeout(()=>{
    localStorage.clear()
    this.router.navigate([""])

    },1000)
  }
}

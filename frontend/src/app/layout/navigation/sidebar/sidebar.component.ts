import { Component, Input } from '@angular/core';
import { NavigationItem } from '../models/navigationsItems';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() navigationItems: NavigationItem[]

  constructor(private router:Router){
    this.navigationItems=[]
  }

  isSidebarOpen:boolean=false
  
  clickedItem:number|null=null

  getArrowClasses(i: number): string {
    return this.clickedItem === i ? 'arrowIcon arrowUp' : 'arrowIcon';
  }

  onItemClick(index: number): void {
    if(!this.clickedItem&& this.clickedItem!==0){
      this.clickedItem = index;
    }
    else{
      this.clickedItem=null
    }
  }

  navigateTo(route:string){
    this.closeSibear()
    this.router.navigate([route]);
    this.clickedItem=null
  }

  closeSibear(){
    this.isSidebarOpen=false
  }
  closeSesion(){
    this.closeSibear()
    setTimeout(()=>{
    localStorage.clear()
    this.router.navigate([""])

    },1000)
  }
}

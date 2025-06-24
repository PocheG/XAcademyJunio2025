import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { columnSetting } from './models/columnsSetting';
import { Pagination } from './models/Pagination';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T extends {[key:string]:any}> implements OnChanges {
  @Input() columnsSetting: columnSetting<T>[]=[]
  @Input() pagination?:Pagination<T>
  @Input() rows:T[]=[]
  @Input() isLoading:boolean=true

  @Output() handlePageChange= new EventEmitter<number>()
  @Output() handleSortChange= new EventEmitter<{orderBy:keyof T, orderDirection:"asc"|"desc"}>()

  constructor(){
    
  }
  currentFooter:string[]=[]

  onLeftArrowClick(){
    if(this.pagination?.page!>1){
      this.onPageChange((this.pagination?.page!-1).toString())
    }
  }
  onRightArrowClick(){
    if(this.pagination?.page===this.pagination?.totalPages){
      this.onPageChange((this.pagination?.page!+1).toString())
    }
  }
  onPageChange(newPage:string){
    if(newPage!=="..."){
      this.handlePageChange.emit(parseInt(newPage))
    }
  }
  onSortChange(key:keyof T){
    const newOrder=this.pagination?.orderDirection==="asc"?"desc":"asc"
    this.handleSortChange.emit({orderBy:key,orderDirection:newOrder})
  }

  calculateFooterPages(){
    if(this.pagination!.page<5){
      this.currentFooter=["1","2","3","4","5","6","7","8","...",(this.pagination!.totalPages-1).toString()]
    }else{
      const footerStart=["1","...",]
      const footerEnd=["...", (this.pagination!.totalPages-1).toString()]
      let middleFooter:string[]=[]
      let index=-4
      while(index<4){
        middleFooter.push((this.pagination!.page+index).toString())
        index++
      }
      this.currentFooter= footerStart.concat(middleFooter.concat(footerEnd))
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.pagination){
      this.calculateFooterPages()
    }
  }

  getArrowClasses(key:string): string {
    return this.pagination?.orderBy===key ? 'arrowIcon arrowUp' : 'arrowIcon';
  }
}

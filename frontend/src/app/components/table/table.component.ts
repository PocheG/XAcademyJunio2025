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
    if(this.pagination?.page!==this.pagination?.totalPages){
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
    if(!this.pagination)this.currentFooter= []

    if(this.pagination!.totalPages<7){
      
      let pageFooter:string[]=[]
      for(let i=1;i<this.pagination!.totalPages;i++){
        pageFooter.push(i.toString())
      }
      this.currentFooter= pageFooter
    }else{
      if(this.pagination?.page!<8){
      
        let pageFooter:string[]=[]
        for(let i=1;i<9;i++){
          pageFooter.push(i.toString())
        }
        this.currentFooter= pageFooter.concat(["...",(this.pagination?.totalPages!).toString()])
        }
      else{
      const footerStart=this.pagination!.page<5?[]:["1","...",]
      const footerEnd= this.pagination!.page+5 <this.pagination!.totalPages?["...", (this.pagination!.totalPages).toString()]:[(this.pagination?.totalPages!).toString()]
      let middleFooter:string[]=[]
      let index=-4
      while(index<5){
        if(this.pagination?.page!+index<this.pagination!.totalPages){
          middleFooter.push((this.pagination!.page+index).toString())
        }
          index++
      }
      this.currentFooter= footerStart.concat(middleFooter.concat(footerEnd))
      }
      
    }
  
    }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.pagination){
      this.calculateFooterPages()
    }
  }

  getArrowClasses(key:string): string {
    return this.pagination?.orderBy===key && this.pagination.orderDirection==="asc"? 'arrowIcon arrowUp' : 'arrowIcon';
  }

  getFooterClasses(currentPage:string):string{
    return this.pagination?.page.toString()===currentPage?"selectedPage":""
  }
}

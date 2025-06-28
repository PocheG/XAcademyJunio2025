import { Component, OnDestroy } from '@angular/core';
import { loadingScreenService } from './service/loadingScreenService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent implements OnDestroy {

  message:string|null=null
  subscription: Subscription;


  constructor(public loadingScreenService: loadingScreenService) {
    this.subscription=this.loadingScreenService.getInfo().subscribe((value) => {
      this.message=value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

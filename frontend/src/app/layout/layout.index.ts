import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navigation/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./navigation/sidebar/sidebar.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { RouterModule } from "@angular/router";
import { ConfirmationModalComponent } from "./confirmation-modal/confirmation-modal.component";
import { ConfirmationModalService } from "./confirmation-modal/service/confirmationModalService";
import { LoadingScreenComponent } from "./loading-screen/loading-screen.component";


@NgModule({
    declarations:[
        NavbarComponent,
        SidebarComponent,
        NavigationComponent,
        ConfirmationModalComponent,
        LoadingScreenComponent
    ],
    imports:[
        CommonModule,
        RouterModule
    ],
    exports:[
        NavigationComponent,
        ConfirmationModalComponent,
        LoadingScreenComponent
    ]
})

export class LayoutModule{}
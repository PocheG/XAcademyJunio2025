import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navigation/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./navigation/sidebar/sidebar.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations:[
        NavbarComponent,
        SidebarComponent,
        NavigationComponent
    ],
    imports:[
        CommonModule,
        RouterModule
    ],
    exports:[
        NavigationComponent
    ]
})

export class LayoutModule{}
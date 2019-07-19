import { Routes,RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import  { AboutComponent } from  'src/app/about/about.component';
import  { InsertItemComponent } from  'src/app/insert-item/insert-item.component';

const APP_ROUTES: Routes = [
    // { path: 'grafo' , component: },
    { path: 'inserirSelo' , component: InsertItemComponent},
    { path: 'sobre' , component: AboutComponent }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
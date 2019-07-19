import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { InsertItemComponent } from './insert-item/insert-item.component';
import { GraphCytoscapeComponent } from './graph-cytoscape/graph-cytoscape.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    InsertItemComponent,
    GraphCytoscapeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'AddItem' , component: InsertItemComponent},
      { path: 'About' , component: AboutComponent },
      { path: 'GraphCytoscape', component: GraphCytoscapeComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { InsertItemComponent } from './insert-item/insert-item.component';
import { GraphCytoscapeComponent } from './graph-cytoscape/graph-cytoscape.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

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
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
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

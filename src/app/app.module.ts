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
import { PresentItemComponent } from './present-item/present-item.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule  } from  'ngx-ui-loader';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    InsertItemComponent,
    GraphCytoscapeComponent,
    HomeComponent,
    PresentItemComponent
  ],
  imports: [
    NgbModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AlifeFileToBase64Module,
    AppRoutingModule, 
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'AddItem' , component: InsertItemComponent},
      { path: 'About' , component: AboutComponent },
      { path: 'GraphCytoscape', component: GraphCytoscapeComponent},
      { path: 'PresentItem', component: PresentItemComponent}
    ])
  ],  
  entryComponents: [GraphCytoscapeComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

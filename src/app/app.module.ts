import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { InsertItemComponent } from './insert-item/insert-item.component';
import { routing } from 'src/app.routing';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    InsertItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

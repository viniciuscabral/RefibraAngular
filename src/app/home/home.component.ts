import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { FusekirefibraService } from 'src/app/service/fusekirefibra.service'
import {Router} from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  relationsName : any = [];
  @Input()
  @Input('ngModel')
  public valueSearch: any;
  isCollapsed = true;
  searchInInput = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.relationsName.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    constructor(    
      private restApi: FusekirefibraService,
      private router: Router
    ) {}

  ngOnInit() {
    this.getAllRelationsName();
  }

  search(value){
    //alert(this.valueSearch); 
    this.router.navigate(["/GraphCytoscape"], { queryParams: {valueSearch: value} })
  }

  getAllRelationsName(){
    this.restApi.getAllRelationsNames()
    .subscribe(
      (data: []) =>  { //start of (1)
        let lista : string[] = data;
        if(data !== null && data.length > 0){
            lista.forEach(element => {            
              //relationsName.push(element.replace("http://pt.wikipedia.org/wiki/",""));
              this.relationsName.push(element);
            });
        }       
        else
         console.log("oi");
      }, //end of (1)
      (error: any)   => console.log(error), //(2) second argument
      ()             => console.log('all data gets') //(3) second argument
    );
}
}

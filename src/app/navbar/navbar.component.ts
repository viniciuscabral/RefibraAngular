import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FusekirefibraService } from 'src/app/service/fusekirefibra.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(    
    private router: Router,
    private restApi: FusekirefibraService
  ) 
  {    
  }

  datasets: any;
   getDataSetNames(){
  
      this.restApi.getDataSetNames()
      .subscribe(
        (data: [] ) =>  {
            this.datasets = data;
        },
        (error: any)=> {
          //alert("Fail!\n" + error.error.message+"\nTry again.");
        }
      )
  }


  ngOnInit() {
    this.getDataSetNames();
  }

  onChange(evt){
    this.router.navigate(["/Home"])
  }
}

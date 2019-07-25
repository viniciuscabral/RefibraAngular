import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FusekirefibraService } from 'src/app/service/fusekirefibra.service'

@Component({
    selector: 'present-item-component',
    templateUrl: './present-item.component.html',
    styleUrls: ['./present-item.component.css']
  })
  
  
  export class PresentItemComponent implements OnInit {
    
    constructor(private route: ActivatedRoute
        , private restApi: FusekirefibraService
        , private router: Router){
    }
    listRelations: [];
    title : string;
    image: string;
    text: string;
    itemRdf: any;
    ngOnInit(): void {
        this.route
        .queryParams
        .subscribe(params => {
          let valueSearch = params['valueSearch'];
          if(valueSearch !== undefined){
            this.getItemByname(valueSearch);
          }
        });
    }
    graphItem(itemRelation){
     //alert(itemRelation);
      this.router.navigate(["/GraphCytoscape"], { queryParams: {valueSearch: itemRelation} })
    }

    async getItemByname(itemName: string){
        return new Promise((resolve,reject) => { 
          this.restApi.getItensByName(itemName)
          .subscribe(
            data =>  {
              this.itemRdf = data;
              console.log(this.itemRdf);
              this.listRelations = this.itemRdf.listRelation ;
              this.title = this.itemRdf.title;
              this.image = this.itemRdf.image;
              this.text = this.itemRdf.text[0];
              resolve();
            },
            error => {}
          )
        });
      }

}
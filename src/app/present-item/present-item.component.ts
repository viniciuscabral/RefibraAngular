import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FusekirefibraService } from 'src/app/service/fusekirefibra.service'
import { IItemRefibra } from 'src/app/basic/itemRefibra.interface'
import { environment } from 'src/environments/environment';
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
    
    imagePath: string = "";
    itemRdf: IItemRefibra;

    ngOnInit(): void {
      
        this.route.queryParams
          .subscribe(params => {
            let valueSearch: string = params['valueSearch'];
            console.log("aqui");
            console.log(valueSearch);
            if(valueSearch !== undefined && valueSearch !== ""){
              this.getItemByname(valueSearch);
            }
            else{
              alert("Fail!\nNo terms to search for.\nTry again.");
              this.router.navigate(["/GraphCytoscape"], {});
            }
          });
    }

    graphItem(itemRelation){     
      this.router.navigate(["/GraphCytoscape"], { queryParams: {valueSearch: itemRelation} })
    }

    verifyImage() {
      let imageUrl: string = "/assets/refibraimg/"+ this.itemRdf.title + ".jpg";
      var img = new Image();
      img.src = imageUrl;              
      this.imagePath = imageUrl;
      img.onerror = function(){
        console.log("erro");
        this.imagePath =  environment.settings.IMAGES_PATH + this.itemRdf.title + ".jpg";        
      }
    }

    async getItemByname(itemName: string){
        return new Promise((resolve,reject) => { 
          this.restApi.getItensByName(itemName)
          .subscribe(
            (data: [] ) =>  {
              let itemRdf1;
              itemRdf1 = data;
              this.itemRdf = itemRdf1;   
             console.log(this.itemRdf.listRelation);
              this.verifyImage();
                   
              resolve();
            },
            (error: any)=> {
              alert("Fail!\n" + error.error.message+"\nTry again.");
            }
          )
        });
      }

}
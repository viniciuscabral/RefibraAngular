import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FusekirefibraService } from 'src/app/service/fusekirefibra.service';
import { IItemRefibra } from 'src/app/basic/itemRefibra.interface';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewDescriptionContent } from 'src/app/add-new-description/addnewdescription.component';

//Optei por deixar o modal na mesma tela do componente.

@Component({
    selector: 'present-item-component',
    templateUrl: './present-item.component.html',
    styleUrls: ['./present-item.component.css']
  })  
  
  export class PresentItemComponent implements OnInit {    
    texts : any = [];
    constructor(private route: ActivatedRoute
        , private restApi: FusekirefibraService
        , private router: Router,
         private modalService: NgbModal){
    }
    
    imagePath: string = "";
    itemRdf: IItemRefibra;

    loadModal(){
      const modalRef =this.modalService.open(AddNewDescriptionContent);
      modalRef.componentInstance.itemRefibra = this.itemRdf;
    }

    ngOnInit(): void {
      
        this.route.queryParams
          .subscribe(params => {
            let valueSearch: string = params['valueSearch'];            
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
              this.texts = this.itemRdf.text;
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
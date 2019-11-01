import { Component,Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { IItemRefibra } from '../basic/itemRefibra.interface';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FusekirefibraService } from 'src/app/service/api.service'
import { Router } from '@angular/router'

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './addnewdescription.component.html',
})
export class AddNewDescriptionContent {

  @Input() public itemRefibra: IItemRefibra;  

  constructor(public activeModal: NgbActiveModal
    ,private ngxService: NgxUiLoaderService
    , public restApi: FusekirefibraService
    , private router: Router
   ) { }

  angForm  = new FormGroup(
  {
    description:new FormControl()
  });

  ngOnInit() {
  }

  onSubmit(){
    let obj: IItemRefibra = this.itemRefibra;
    obj.text[0] =this.angForm.value.description;
    this.setNewItem(obj);
  }
  async setNewItem(item: IItemRefibra){
    this.ngxService.start();
    return new Promise(resolve => {
      this.restApi.setNewItem(item)
          .subscribe(
            (data: any) =>  {
              this.ngxService.stopAll();
              alert("New description added successful");
              this.router.navigate(["/GraphCytoscape"])
              this.activeModal.close('Close click')
              resolve();    
            }, 
            (error: any)   => 
            {
              this.ngxService.stopAll();
              console.log(error)
            }
          );
      });
    }
}
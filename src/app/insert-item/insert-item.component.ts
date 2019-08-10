import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FusekirefibraService } from 'src/app/service/fusekirefibra.service'
import { IItemRefibra } from "src/app/basic/itemRefibra.interface"
import { Guid } from "guid-typescript";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router'

@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.component.html',
  styleUrls: ['./insert-item.component.css']
})
export class InsertItemComponent implements OnInit {

  url: any;
  angForm  = new FormGroup({
    description: new FormControl(''),
    imageBase64: new FormControl('')
  });
  
  constructor(    
    public restApi: FusekirefibraService
    ,private ngxService: NgxUiLoaderService
    ,private router: Router
  ) {}

  onSubmit(){    
   let id = Guid.create().toString();
   let obj: IItemRefibra = {item: "", title: id, text: [this.angForm.value.description]
    ,image: this.angForm.value.imageBase64,listRelation:[],listRelationItem: []};  
    this.setNewItem(obj);
  }

  async setNewItem(item: IItemRefibra){
    this.ngxService.start();
    return new Promise(resolve => {
      this.restApi.setNewItem(item)
      .subscribe(
        (data: any) =>  {
           this.ngxService.stopAll();
           this.router.navigate(["/Home"])
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

  onFileChanges(evt){
    this.angForm.patchValue({
      imageBase64: evt[0].base64
    });
    this.url = evt[0].base64;
  }

  ngOnInit() {
  }

}

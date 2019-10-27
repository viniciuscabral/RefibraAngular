import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IItemRefibra} from 'src/app/basic/itemRefibra.interface'
import {IItemRefibraRelation} from 'src/app/basic/itemRefibraRelation.interface'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FusekirefibraService {

  //base_url: string = 'http://api.devcabral.com.br:5000';
  //base_url: string = 'http://localhost:47706';

  base_url: string = environment.settings.BACKEND_API_FUSEKI_URL;
  
  data_set: string = 'Refibra';
  constructor(private http: HttpClient) { } 

  getAllItens(): Observable<IItemRefibra[]>{
    console.log(this.base_url);
    var target = (document.getElementById('selectDataSet')) as HTMLSelectElement;
      this.data_set = target.options[target.selectedIndex].text;
      
      console.log('getting all todos from the server');
      return this.http.get<IItemRefibra[]>(`${this.base_url}/GetAllItens?dataSet=${this.data_set}`);
  }

  getAllItensRelation(): Observable<IItemRefibraRelation[]>{
    var target = (document.getElementById('selectDataSet')) as HTMLSelectElement;
    this.data_set = target.options[target.selectedIndex].text;
    console.log('getting all Itens Relation todos from the server');
    return this.http.get<IItemRefibraRelation[]>(`${this.base_url}/ItensRelation?dataSet=${this.data_set}`);
  }

  getAllRelationsNames(): Observable<IItemRefibra[]>{
    var target = (document.getElementById('selectDataSet')) as HTMLSelectElement;
    this.data_set = target.options[target.selectedIndex].text;
    console.log('getting all relations name');
    return this.http.get<[]>(`${this.base_url}/GetAllRelationsNames?dataSet=${this.data_set}`);
  }

  getItensByRelationName(valueSearch): Observable<IItemRefibra[]>{
    var target = (document.getElementById('selectDataSet')) as HTMLSelectElement;
    this.data_set = target.options[target.selectedIndex].text;
    console.log('getting all relations name');
    return this.http.get<IItemRefibra[]>(`${this.base_url}/GetItensByRelationName?relatioName=${valueSearch}&dataSet=${this.data_set}`);
  }

  getItensByName(itemName): Observable<IItemRefibra[]>{
    var target = (document.getElementById('selectDataSet')) as HTMLSelectElement;
    this.data_set = target.options[target.selectedIndex].text;
    console.log('getting especific item');
    return this.http.get<IItemRefibra[]>(`${this.base_url}/ItensByName?itemName=${itemName}&dataSet=${this.data_set}`);
  }

  setNewItem(item): Observable<IItemRefibra[]>{
    var target = (document.getElementById('selectDataSet')) as HTMLSelectElement;
    this.data_set = target.options[target.selectedIndex].text;
    console.log('create a new especific item');
    return this.http.post<IItemRefibra[]>(`${this.base_url}/AddItem?dataSet=${this.data_set}`,{Name: item.title, Text: item.text[0], Image: item.image});
  }
}


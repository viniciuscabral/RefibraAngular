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

  base_url: string = environment.settings.BACKEND_API_FUSEKI_URL;
  
  data_set: string = 'Refibra';
  constructor(private http: HttpClient) { 
    var target = (document.getElementById('selectDataSet')) as HTMLSelectElement;
    this.data_set = target.options[target.selectedIndex].text;  
  } 

  getAllItens(): Observable<IItemRefibra[]>{
      console.log('getting all todos from the server');
      return this.http.get<IItemRefibra[]>(`${this.base_url}/GetAllItens?dataSet=${this.data_set}`,{headers: {'Content-Type' : 'application/json; charset=UTF-8'}});
  }

  getAllItensRelation(): Observable<IItemRefibraRelation[]>{
    return this.http.get<IItemRefibraRelation[]>(`${this.base_url}/ItensRelation?dataSet=${this.data_set}`,{headers: {'Content-Type' : 'application/json; charset=UTF-8'}});
  }

  getAllRelationsNames(): Observable<IItemRefibra[]>{
    return this.http.get<[]>(`${this.base_url}/GetAllRelationsNames?dataSet=${this.data_set}`,{headers: {'Content-Type' : 'application/json; charset=UTF-8'}});
  }

  getItensByRelationName(valueSearch): Observable<IItemRefibra[]>{
    return this.http.get<IItemRefibra[]>(`${this.base_url}/GetItensByRelationName?relatioName=${valueSearch}&dataSet=${this.data_set}`,{headers: {'Content-Type' : 'application/json; charset=UTF-8'}});
  }

  getItensByName(itemName): Observable<IItemRefibra[]>{
    return this.http.get<IItemRefibra[]>(`${this.base_url}/ItensByName?itemName=${itemName}&dataSet=${this.data_set}`,{headers: {'Content-Type' : 'application/json; charset=UTF-8'}});
  }

  setNewItem(item): Observable<IItemRefibra[]>{
    return this.http.post<IItemRefibra[]>(`${this.base_url}/AddItem?dataSet=${this.data_set}`,{Name: item.title, Text: item.text[0], Image: item.image});
  }

  getDataSetNames(): Observable<any>{
    return this.http.get<any>(`${this.base_url}/GetDataSetNames`);
  }
  
}


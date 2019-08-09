import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IItemRefibra} from 'src/app/basic/itemRefibra.interface'
import {IItemRefibraRelation} from 'src/app/basic/itemRefibraRelation.interface'

@Injectable({
  providedIn: 'root'
})
export class FusekirefibraService {

  base_url: string = 'http://api.devcabral.com.br';

    constructor(private http: HttpClient) { } 
  getAllItens(): Observable<IItemRefibra[]>{
      console.log('getting all todos from the server');
      return this.http.get<IItemRefibra[]>(`${this.base_url}/GetAllItens`);
  }

  getAllItensRelation(): Observable<IItemRefibraRelation[]>{
    console.log('getting all Itens Relation todos from the server');
    return this.http.get<IItemRefibraRelation[]>(`${this.base_url}/ItensRelation`);
  }

  getAllRelationsNames(): Observable<IItemRefibra[]>{
    console.log('getting all relations name');
    return this.http.get<[]>(`${this.base_url}/GetAllRelationsNames`);
  }

  getItensByRelationName(valueSearch): Observable<IItemRefibra[]>{
    console.log('getting all relations name');
    return this.http.get<IItemRefibra[]>(`${this.base_url}/GetItensByRelationName?relatioName=${valueSearch}`);
  }

  getItensByName(itemName): Observable<IItemRefibra[]>{
    console.log('getting especific item');
    return this.http.get<IItemRefibra[]>(`${this.base_url}/ItensByName?itemName=${itemName}`);
  }

  setNewItem(item): Observable<IItemRefibra[]>{
    console.log('create a new especific item');
    return this.http.post<IItemRefibra[]>(`${this.base_url}/AddItemAsyn`,item);
  }
}


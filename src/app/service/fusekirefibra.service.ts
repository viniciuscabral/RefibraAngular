import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FusekirefibraService {

    constructor(private http: HttpClient) { 
    }
    base_url: string = environment.settings.BACKEND_API_FUSEKI_URL;
    getDataSetNames(): Observable<any>{
        return this.http.get<any>(`${this.base_url}/GetDataSetNames`);
    }
}
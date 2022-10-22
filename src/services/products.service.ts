import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Bar } from 'src/app/models/bar.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

constructor(private http: HttpClient) { }

  getCategories():Observable<Bar>{
    return this.http.get<Bar>('https://test.dev.al/test/');
  }

}


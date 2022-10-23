import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Bar } from 'src/app/models/bar.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  /**
   * GET request to receive all data from the json file and return an Observable of type Bar.
   */
  getCategories(): Observable<Bar> {
    return this.http.get<Bar>('https://test.dev.al/test/');
  }
  
  /**
    * replace empty spaces with "-" and remove "/"
    * for example "Food Menu/Snacks" will be formatted into "food-menu-snacks"
    */
  modifyString(input: string): string {
    if (input && input.length) {
      return input.toLowerCase().split(' ').join('-').split('/').join('')
    }
    return ''
  }

}


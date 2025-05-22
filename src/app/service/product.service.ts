import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProductDTO } from '../model/Product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  /**
   * Only to this job opotunity test - returns a list, based in a filter, or default value 5 and 0 for paginations
   * Fetches a paginated list of products and returns the array of ProductDTO
   */
  list(
    filter: string = '',
    page: number = 0,
    size: number = 5
  ): Observable<ProductDTO[]> {
    const params = new HttpParams()
      .set('filter', filter)
      .set('page', page.toString())
      .set('size', size.toString());

    // Page<ProductDTO> with 'content' array - need to observe array to list, further implementations
    return this.http
      .get<{ content: ProductDTO[] }>(this.baseUrl + '/products', { params })
      .pipe(map((response) => response.content));
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/category/parent`);
  }
}

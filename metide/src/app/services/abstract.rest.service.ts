import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config-service';
import { map } from 'rxjs/operators';
import * as queryString from 'query-string';

export abstract class AbstractRestService<T>{

  protected headers = new HttpHeaders();

  constructor(
    protected httpClient: HttpClient, protected endpoint: string) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }

  create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.endpoint}`, this.serialize(item), { headers: this.headers })
      .pipe(map(data => this.deserialize(data)));
  }

  read(id: number | string): Observable<T> {
    return this.httpClient
      .get(`${this.endpoint}/${id}`)
      .pipe(map((data: any) => this.deserialize(data)));
  }

  update(id: number | string, item: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.endpoint}/${id}`, this.serialize(item), { headers: this.headers })
      .pipe(map(data => this.deserialize(data)));
  }

  
  list(queryOptions: any): Observable<T[]> {
    return this.httpClient
      .get(`${this.endpoint}?${queryString.stringify(queryOptions)}`)
      .pipe(
        map((data: any) => data)
      );
  }

  protected serialize(item: T): string {
    return JSON.stringify(item);
  }

  protected deserialize(item: any): T {
    return item as T;
  }
}
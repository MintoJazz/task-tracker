import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export type Params = Record<string, string | number | boolean>;

@Injectable({
  providedIn: 'root',
})
export class DataService<Item> {
  private readonly apiUrl = environment.apiUrl;

  private readonly http = inject(HttpClient);

  private buildUrl(
    path: string,
    queryParams: Params = {}
  ): string {
    const url = `${this.apiUrl}/${path.replace(/^\/+/, '')}`;

    const query = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.set(key, String(value));
      }
    });

    return query.toString()
      ? `${url}?${query.toString()}`
      : url;
  }

  protected get<T = Item>(
    path: string,
    queryParams: Params = {}
  ): Observable<T> {
    return this.http.get<T>(
      this.buildUrl(path, queryParams)
    );
  }

  protected post<T = Item>(
    path: string,
    body: unknown,
    queryParams: Params = {}
  ): Observable<T> {
    return this.http.post<T>(
      this.buildUrl(path, queryParams),
      body
    );
  }

  protected put<T = Item>(
    path: string,
    body: unknown,
    queryParams: Params = {}
  ): Observable<T> {
    return this.http.put<T>(
      this.buildUrl(path, queryParams),
      body
    );
  }

  protected delete<T = void>(
    path: string,
    queryParams: Params = {}
  ): Observable<T> {
    return this.http.delete<T>(
      this.buildUrl(path, queryParams)
    );
  }
}
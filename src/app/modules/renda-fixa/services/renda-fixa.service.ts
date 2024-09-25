import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { URL_CONFIG } from '../../../config/url.config';
import { IRendaFixa, IRendaFixaCreate, IRendaFixaFilter, IRendaFixaSave } from '../models/renda-fixa';

@Injectable({
  providedIn: 'root'
})
export class RendaFixaService {
  private httpClient = inject(HttpClient);

  public getAll(filter?: IRendaFixaFilter): Observable<IRendaFixa[]> {
    let params = new HttpParams();

    if (filter) {
      for (let key in filter) {
        const value = filter[key as keyof IRendaFixaFilter];
        if (value) {
          params = params.set(key, value);
        }
      }
    }

    return this.httpClient.get<IRendaFixa[]>(URL_CONFIG.Rendafixa, { params: params });
  }

  public getRendaFixaById(id: number): Observable<IRendaFixa | undefined> {
    return this.getAll({
      Id: id
    })
      .pipe(
        map((response: IRendaFixa[]) => (response || []).find((r: IRendaFixa) => r.id === id))
      );
  }

  public store(rendaFixa: IRendaFixaCreate): Observable<unknown> {
    const body = rendaFixa;
    return this.httpClient.post(URL_CONFIG.Rendafixa, body).pipe(
      tap(r => console.log('store', r))
    )
  }

  public update(rendaFixa: IRendaFixaSave): Observable<unknown> {
    const body = rendaFixa;
    return this.httpClient.put(URL_CONFIG.Rendafixa, body).pipe(
      tap(r => console.log('update', r))
    )
  }

  public destroy(id: number): Observable<unknown> {
    return this.httpClient.delete(`${URL_CONFIG.Rendafixa}/${id}`);
  }
}

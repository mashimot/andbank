import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_CONFIG } from '../../../config/url.config';
import { IIndexador } from '../models/indexador';

@Injectable({
  providedIn: 'root'
})
export class IndexadorService {
  public httpClient = inject(HttpClient);

  constructor() { }

  public indexadores(tipoProduto: number): Observable<IIndexador[]> {
    return this.httpClient.get<IIndexador[]>(`${URL_CONFIG.Indexador}/${tipoProduto}`);
  }
}

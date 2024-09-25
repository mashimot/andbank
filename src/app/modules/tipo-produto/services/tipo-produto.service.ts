import { URL_CONFIG } from './../../../config/url.config';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITipoProduto } from '../models/tipo-produto';

@Injectable({
  providedIn: 'root'
})
export class TipoProdutoService {
  public httpClient = inject(HttpClient);

  constructor() { }

  public tipoProduto(): Observable<ITipoProduto[]> {
    return this.httpClient.get<ITipoProduto[]>(`${URL_CONFIG.TipoProduto}`);
  }
}

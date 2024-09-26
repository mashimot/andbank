import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { URL_CONFIG } from '../../../config/url.config';
import { IIndexador } from '../models/indexador';
import { IndexadorService } from './indexador.service';

describe('IndexadorService', () => {
  let service: IndexadorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IndexadorService]
    });

    service = TestBed.inject(IndexadorService); IndexadorService
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica se não existem requisições pendentes
  });

  it('deve buscar todos os Indexadores com filtros', () => {
    const mockResponse: IIndexador[] = [{
      id: 1,
      nome: 'Indexador 1'
    }, {
      id: 2,
      nome: 'Indexador 2'
    }, {
      id: 3,
      nome: 'Indexador 3'
    }];

    service.indexadores(12).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req: TestRequest = httpTestingController.expectOne(request =>
      request.method === 'GET' && request.url === URL_CONFIG.Indexador + '/12' 
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

});

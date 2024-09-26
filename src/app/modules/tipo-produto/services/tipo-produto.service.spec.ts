import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { URL_CONFIG } from '../../../config/url.config';
import { ITipoProduto } from '../models/tipo-produto';
import { TipoProdutoService } from './tipo-produto.service';

describe('TipoProdutoService', () => {
  let service: TipoProdutoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TipoProdutoService]
    });

    service = TestBed.inject(TipoProdutoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica se não existem requisições pendentes
  });

  it('deve buscar todos os Produtos', () => {
    const mockResponse: ITipoProduto[] = [{
      id: 1,
      nome: 'Produto 1'
    },{
      id: 2,
      nome: 'Produto 2'
    }];

    service.tipoProduto().subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.length).toBe(3);
    });

    const req: TestRequest = httpTestingController.expectOne(request =>
      request.method === 'GET' && request.url === URL_CONFIG.TipoProduto
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

});

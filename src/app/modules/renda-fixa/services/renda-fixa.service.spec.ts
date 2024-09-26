import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { URL_CONFIG } from '../../../config/url.config';
import { IRendaFixa, IRendaFixaCreate, IRendaFixaFilter, IRendaFixaSave } from '../models/renda-fixa';
import { RendaFixaService } from './renda-fixa.service';

describe('RendaFixaService', () => {
  let service: RendaFixaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RendaFixaService]
    });

    service = TestBed.inject(RendaFixaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica se não existem requisições pendentes
  });

  it('deve buscar todas as Rendas Fixas com filtros', () => {
    const filter: IRendaFixaFilter = { Id: 1, Descricao: 'Papagaio' };
    const mockResponse: IRendaFixa[] = [{ id: 1 }] as any;

    service.getAll(filter).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req: TestRequest = httpTestingController.expectOne(request =>
      request.method === 'GET' && request.url === URL_CONFIG.Rendafixa
    );

    expect(req.request.params.get('Id')).toBe('1');
    expect(req.request.params.has('Id')).toBe(true);
    expect(req.request.params.get('Descricao')).toBe('Papagaio');
    expect(req.request.params.has('Descricao')).toBe(true);
    expect(req.request.params.has('IndexadorId')).toBe(false);
    expect(req.request.params.has('TipoProdutoId')).toBe(false);
    expect(req.request.params.keys().length).toBe(2);

    req.flush(mockResponse);
  });

  it('deve buscar uma Renda Fixa por ID', () => {
    const mockResponse: IRendaFixa[] = [{ id: 1 }] as any;;

    service.getRendaFixaById(1).subscribe(response => {
      expect(response).toEqual(mockResponse[0]);
    });

    const req = httpTestingController.expectOne(request =>
      request.method === 'GET' && request.url === URL_CONFIG.Rendafixa
    );

    req.flush(mockResponse);
  });

  it('deve armazenar uma nova Renda Fixa', () => {
    const rendaFixa: IRendaFixaCreate = { /* dados necessários */ } as any;;
    const mockResponse = { /* resposta esperada */ };

    service.store(rendaFixa).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(request =>
      request.method === 'POST' && request.url === URL_CONFIG.Rendafixa
    );

    req.flush(mockResponse);
  });

  it('deve atualizar uma Renda Fixa', () => {
    const rendaFixa: IRendaFixaSave = { /* dados necessários */ } as any;;
    const mockResponse = { /* resposta esperada */ };

    service.update(rendaFixa).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(request =>
      request.method === 'PUT' && request.url === URL_CONFIG.Rendafixa
    );

    req.flush(mockResponse);
  });

  it('deve excluir uma Renda Fixa', () => {
    const id = 1;

    service.destroy(id).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne(request =>
      request.method === 'DELETE' && request.url === `${URL_CONFIG.Rendafixa}/${id}`
    );

    req.flush(null);
  });
});

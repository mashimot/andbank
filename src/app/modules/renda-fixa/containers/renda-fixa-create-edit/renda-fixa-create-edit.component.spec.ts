import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendaFixaCreateEditComponent } from './renda-fixa-create-edit.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RendaFixaService } from '../../services/renda-fixa.service';
import { TipoProdutoService } from '../../../tipo-produto/services/tipo-produto.service';
import { Router } from '@angular/router';
import { IndexadorService } from '../../../indexador/services/indexador.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('RendaFixaCreateEditComponent', () => {
  let component: RendaFixaCreateEditComponent;
  let fixture: ComponentFixture<RendaFixaCreateEditComponent>;
  let router: Router;
  let snackBar: MatSnackBar;
  let rendaFixaService: RendaFixaService;
  let tipoProdutoService: TipoProdutoService;
  let indexadorService: IndexadorService;

  beforeEach(() => {
    const routerMockStub = {
      navigate: jest.fn(),
    };

    const snackBarMockStub = {
      open: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [
        RendaFixaCreateEditComponent,
        RouterTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatSnackBar, useValue: snackBarMockStub },
        {
          provide: RendaFixaService,
          useValue: {
            getRendaFixaById: () => of(null)
          }
        },
        {
          provide: TipoProdutoService,
          useValue: {
            tipoProduto: () => of(null)
          }
        },
        {
          provide: IndexadorService,
          useValue: {
            indexadores: () => of(null)
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendaFixaCreateEditComponent);
    component = fixture.componentInstance;

    snackBar = TestBed.inject(MatSnackBar);
    rendaFixaService = TestBed.inject(RendaFixaService);
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    tipoProdutoService = TestBed.inject(TipoProdutoService);
    indexadorService = TestBed.inject(IndexadorService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

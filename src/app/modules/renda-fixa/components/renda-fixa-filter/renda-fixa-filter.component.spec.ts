import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RendaFixaFilterComponent } from './renda-fixa-filter.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IRendaFixaFilter } from '../../models/renda-fixa';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

describe('RendaFixaFilterComponent', () => {
  let component: RendaFixaFilterComponent;
  let fixture: ComponentFixture<RendaFixaFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [       
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        RendaFixaFilterComponent
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora erros de templates não encontrados
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendaFixaFilterComponent);
    component = fixture.componentInstance;

    // Inicializa o formulário aqui
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm.controls['Id']).toBeDefined();
    expect(component.searchForm.controls['Descricao']).toBeDefined();
    expect(component.searchForm.controls['TipoProdutoId']).toBeDefined();
    expect(component.searchForm.controls['IndexadorId']).toBeDefined();
  });

  it('should patch the form with searchFilter on changes', () => {
    const searchFilter: IRendaFixaFilter = {
      Id: 1,
      Descricao: 'Test Description',
      TipoProdutoId: 2,
      IndexadorId: 3,
    };

    component.searchFilter = searchFilter;
    component.ngOnChanges({
      searchFilter: {
        currentValue: searchFilter,
        previousValue: null,
        firstChange: true,
      },
    } as any);

    expect(component.searchForm.value).toEqual(searchFilter);
  });

  it('should reset the form when clear is called', () => {
    component.searchForm.patchValue({
      Id: 1,
      Descricao: 'Test',
      TipoProdutoId: 2,
      IndexadorId: 3,
    });

    component.clear();

    expect(component.searchForm.value).toEqual({
      Id: '',
      Descricao: '',
      TipoProdutoId: '',
      IndexadorId: '',
    });
  });

  it('should emit search event with form value on submit', () => {
    const searchFilter: IRendaFixaFilter = {
      Id: 1,
      Descricao: 'Test',
      TipoProdutoId: 2,
      IndexadorId: 3,
    };
    component.searchForm.patchValue(searchFilter);
    jest.spyOn(component.search, 'emit');

    component.onSubmit();

    expect(component.search.emit).toHaveBeenCalledWith(searchFilter);
  });
});

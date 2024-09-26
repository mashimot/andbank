import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IRendaFixaFilter } from '../../models/renda-fixa';
import { RendaFixaFilterComponent } from './renda-fixa-filter.component';

describe('RendaFixaFilterComponent', () => {
  let component: RendaFixaFilterComponent;
  let fixture: ComponentFixture<RendaFixaFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RendaFixaFilterComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendaFixaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
      Descricao: 'Legal Descricao',
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
      Descricao: 'Descricao', 
      TipoProdutoId: 2,
      IndexadorId: 3,
    });

    component.clear();

    expect(component.searchForm.value).toEqual({
      Id: null,
      Descricao: null,
      TipoProdutoId: null,
      IndexadorId: null,
    });
  });

  it('should emit search event with form value on submit', () => {
    const searchFilter: IRendaFixaFilter = {
      Id: 1,
      Descricao: 'Descricao Descricao',
      TipoProdutoId: 2,
      IndexadorId: 3,
    };
    component.searchForm.patchValue(searchFilter);
    jest.spyOn(component.search, 'emit');

    component.onSubmit();

    expect(component.search.emit).toHaveBeenCalledWith(searchFilter);
  });
});

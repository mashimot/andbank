import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendaFixaDetailComponent } from './renda-fixa-detail.component';
import { RendaFixaService } from '../../services/renda-fixa.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('RendaFixaDetailComponent', () => {
  let component: RendaFixaDetailComponent;
  let fixture: ComponentFixture<RendaFixaDetailComponent>;
  let rendaFixaService: RendaFixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RendaFixaDetailComponent,
        RouterTestingModule
      ],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: RendaFixaService,
          useValue: {
            getRendaFixaById: () => of(null)
          }
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendaFixaDetailComponent);
    component = fixture.componentInstance;
    
    rendaFixaService = TestBed.inject(RendaFixaService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

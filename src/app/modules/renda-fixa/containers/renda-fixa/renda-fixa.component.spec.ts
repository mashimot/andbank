import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { RendaFixaComponent } from './renda-fixa.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RendaFixaService } from '../../services/renda-fixa.service';
import { Router } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('RendaFixaComponent', () => {
  let component: RendaFixaComponent;
  let fixture: ComponentFixture<RendaFixaComponent>;
  let router: Router;
  let snackBar: MatSnackBar;
  let rendaFixaService: RendaFixaService;

  beforeEach(() => {
    const routerMockStub = {
      navigate: jest.fn(),
    };

    const snackBarMockStub = {
      open: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [
        RendaFixaComponent,
        RouterTestingModule
      ],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatSnackBar, useValue: snackBarMockStub },
        {
          provide: RendaFixaService,
          useValue: {
            getAll: () => of([])
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendaFixaComponent);
    component = fixture.componentInstance;

    snackBar = TestBed.inject(MatSnackBar);
    rendaFixaService = TestBed.inject(RendaFixaService);
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

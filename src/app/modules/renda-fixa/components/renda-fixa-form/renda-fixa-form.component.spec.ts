import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendaFixaFormComponent } from './renda-fixa-form.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('RendaFixaFormComponent', () => {
  let component: RendaFixaFormComponent;
  let fixture: ComponentFixture<RendaFixaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RendaFixaFormComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendaFixaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

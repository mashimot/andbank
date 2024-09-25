import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendaFixaDetailComponent } from './renda-fixa-detail.component';

describe('RendaFixaDetailComponent', () => {
  let component: RendaFixaDetailComponent;
  let fixture: ComponentFixture<RendaFixaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendaFixaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendaFixaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

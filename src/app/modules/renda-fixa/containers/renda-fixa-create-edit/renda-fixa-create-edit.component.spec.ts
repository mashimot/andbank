import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendaFixaCreateEditComponent } from './renda-fixa-create-edit.component';

describe('RendaFixaCreateEditComponent', () => {
  let component: RendaFixaCreateEditComponent;
  let fixture: ComponentFixture<RendaFixaCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendaFixaCreateEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendaFixaCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

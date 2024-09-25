import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendaFixaListComponent } from './renda-fixa-list.component';

describe('RendaFixaListComponent', () => {
  let component: RendaFixaListComponent;
  let fixture: ComponentFixture<RendaFixaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendaFixaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendaFixaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

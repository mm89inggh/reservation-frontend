import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsInfoComponent } from './transactions-info.component';

describe('TransactionsInfoComponent', () => {
  let component: TransactionsInfoComponent;
  let fixture: ComponentFixture<TransactionsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

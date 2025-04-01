import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRestrictedComponent } from './access-restricted.component';

describe('AccessRestrictedComponent', () => {
  let component: AccessRestrictedComponent;
  let fixture: ComponentFixture<AccessRestrictedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessRestrictedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessRestrictedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

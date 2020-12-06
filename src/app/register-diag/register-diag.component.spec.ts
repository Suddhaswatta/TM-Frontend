import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDiagComponent } from './register-diag.component';

describe('RegisterDiagComponent', () => {
  let component: RegisterDiagComponent;
  let fixture: ComponentFixture<RegisterDiagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDiagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

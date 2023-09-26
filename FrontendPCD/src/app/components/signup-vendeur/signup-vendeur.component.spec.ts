import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupVendeurComponent } from './signup-vendeur.component';

describe('SignupVendeurComponent', () => {
  let component: SignupVendeurComponent;
  let fixture: ComponentFixture<SignupVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupVendeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

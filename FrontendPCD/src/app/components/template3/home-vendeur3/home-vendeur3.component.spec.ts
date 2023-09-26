import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVendeur3Component } from './home-vendeur3.component';

describe('HomeVendeur3Component', () => {
  let component: HomeVendeur3Component;
  let fixture: ComponentFixture<HomeVendeur3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeVendeur3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeVendeur3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

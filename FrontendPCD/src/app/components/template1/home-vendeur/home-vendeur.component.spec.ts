import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVendeurComponent } from './home-vendeur.component';

describe('HomeVendeurComponent', () => {
  let component: HomeVendeurComponent;
  let fixture: ComponentFixture<HomeVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeVendeurComponent  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

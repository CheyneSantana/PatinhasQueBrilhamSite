import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracaoComponent } from './administracao.component';

describe('AdministracaoComponent', () => {
  let component: AdministracaoComponent;
  let fixture: ComponentFixture<AdministracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

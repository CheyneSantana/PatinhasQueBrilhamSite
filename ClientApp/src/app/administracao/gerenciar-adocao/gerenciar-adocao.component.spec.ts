import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarAdocaoComponent } from './gerenciar-adocao.component';

describe('GerenciarAdocaoComponent', () => {
  let component: GerenciarAdocaoComponent;
  let fixture: ComponentFixture<GerenciarAdocaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarAdocaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarAdocaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

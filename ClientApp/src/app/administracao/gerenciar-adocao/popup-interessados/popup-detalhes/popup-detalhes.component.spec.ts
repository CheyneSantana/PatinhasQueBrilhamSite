import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDetalhesComponent } from './popup-detalhes.component';

describe('PopupDetalhesComponent', () => {
  let component: PopupDetalhesComponent;
  let fixture: ComponentFixture<PopupDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

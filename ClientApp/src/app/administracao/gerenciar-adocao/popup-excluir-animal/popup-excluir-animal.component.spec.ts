import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupExcluirAnimalComponent } from './popup-excluir-animal.component';

describe('PopupExcluirAnimalComponent', () => {
  let component: PopupExcluirAnimalComponent;
  let fixture: ComponentFixture<PopupExcluirAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupExcluirAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupExcluirAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

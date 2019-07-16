import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditarAnimalComponent } from './popup-editar-animal.component';

describe('PopupEditarAnimalComponent', () => {
  let component: PopupEditarAnimalComponent;
  let fixture: ComponentFixture<PopupEditarAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupEditarAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEditarAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

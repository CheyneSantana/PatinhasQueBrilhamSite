import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInserirAnimalComponent } from './popup-inserir-animal.component';

describe('PopupInserirAnimalComponent', () => {
  let component: PopupInserirAnimalComponent;
  let fixture: ComponentFixture<PopupInserirAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupInserirAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupInserirAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

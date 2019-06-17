import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacaoComponent } from './doacao.component';

describe('DoacaoComponent', () => {
  let component: DoacaoComponent;
  let fixture: ComponentFixture<DoacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

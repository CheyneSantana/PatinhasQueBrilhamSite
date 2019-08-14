import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFotoComponent } from './upload-foto.component';

describe('UploadFotoComponent', () => {
  let component: UploadFotoComponent;
  let fixture: ComponentFixture<UploadFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

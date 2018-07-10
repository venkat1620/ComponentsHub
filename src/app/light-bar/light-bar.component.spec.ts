import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightBarComponent } from './light-bar.component';

describe('LightBarComponent', () => {
  let component: LightBarComponent;
  let fixture: ComponentFixture<LightBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

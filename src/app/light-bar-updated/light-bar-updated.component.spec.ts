import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightBarUpdatedComponent } from './light-bar-updated.component';

describe('LightBarUpdatedComponent', () => {
  let component: LightBarUpdatedComponent;
  let fixture: ComponentFixture<LightBarUpdatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightBarUpdatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightBarUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

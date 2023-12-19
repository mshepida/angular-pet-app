import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationsAppComponent } from './animations-app.component';

describe('AnimationsAppComponent', () => {
  let component: AnimationsAppComponent;
  let fixture: ComponentFixture<AnimationsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationsAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimationsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

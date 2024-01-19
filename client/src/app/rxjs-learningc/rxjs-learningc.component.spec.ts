import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsLearningcComponent } from './rxjs-learningc.component';

describe('RxjsLearningcComponent', () => {
  let component: RxjsLearningcComponent;
  let fixture: ComponentFixture<RxjsLearningcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsLearningcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsLearningcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrizeComponent } from './add-prize.component';

describe('AddPrizeComponent', () => {
  let component: AddPrizeComponent;
  let fixture: ComponentFixture<AddPrizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

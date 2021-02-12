import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDefenceComponent } from './self-defence.component';

describe('SelfDefenceComponent', () => {
  let component: SelfDefenceComponent;
  let fixture: ComponentFixture<SelfDefenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfDefenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfDefenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

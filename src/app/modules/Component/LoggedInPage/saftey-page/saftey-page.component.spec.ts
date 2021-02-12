import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafteyPageComponent } from './saftey-page.component';

describe('SafteyPageComponent', () => {
  let component: SafteyPageComponent;
  let fixture: ComponentFixture<SafteyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafteyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafteyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

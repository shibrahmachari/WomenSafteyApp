import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensafteyinfoComponent } from './womensafteyinfo.component';

describe('WomensafteyinfoComponent', () => {
  let component: WomensafteyinfoComponent;
  let fixture: ComponentFixture<WomensafteyinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomensafteyinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WomensafteyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

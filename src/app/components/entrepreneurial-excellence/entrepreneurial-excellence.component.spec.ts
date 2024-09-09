import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurialExcellenceComponent } from './entrepreneurial-excellence.component';

describe('EntrepreneurialExcellenceComponent', () => {
  let component: EntrepreneurialExcellenceComponent;
  let fixture: ComponentFixture<EntrepreneurialExcellenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreneurialExcellenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurialExcellenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

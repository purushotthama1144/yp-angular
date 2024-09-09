import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadGenerationFormComponent } from './lead-generation-form.component';

describe('LeadGenerationFormComponent', () => {
  let component: LeadGenerationFormComponent;
  let fixture: ComponentFixture<LeadGenerationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadGenerationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadGenerationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

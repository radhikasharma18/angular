import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonIndividual } from './non-individual';

describe('NonIndividual', () => {
  let component: NonIndividual;
  let fixture: ComponentFixture<NonIndividual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonIndividual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonIndividual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

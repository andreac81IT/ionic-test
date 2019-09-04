import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryNotePagePage } from './country-note-page.page';

describe('CountryNotePagePage', () => {
  let component: CountryNotePagePage;
  let fixture: ComponentFixture<CountryNotePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryNotePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryNotePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

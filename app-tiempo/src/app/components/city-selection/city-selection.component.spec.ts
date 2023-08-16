import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CitySelectionComponent } from './city-selection.component';
import { By } from '@angular/platform-browser';

describe('CitySelectionComponent test', () => {
  let component: CitySelectionComponent;
  let fixture: ComponentFixture<CitySelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CitySelectionComponent],
      providers:[CitySelectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CitySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The CitySelectionComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  it('testing city selection', () => {
    const compiled = fixture.debugElement;
    const select = compiled.query(By.css('#cities')).nativeElement;
    select.dispatchEvent(new Event('change'));

    expect(component.optionSelected).toBe(select.value);
})

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFashion } from './search-fashion';
describe('SearchFashion', () => {
  let component: SearchFashion;
  let fixture: ComponentFixture<SearchFashion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFashion],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFashion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

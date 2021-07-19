import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedLocationsListComponent } from './saved-locations-list.component';

describe('SavedLocationsListComponent', () => {
  let component: SavedLocationsListComponent;
  let fixture: ComponentFixture<SavedLocationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedLocationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedLocationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if a value saved in `selected` property', () => {
    expect(component.selected?.length).toBeLessThan(1);
    component.selectedLocation("test-string");
    expect(component.selected?.length).toBeGreaterThan(0);
  })
});

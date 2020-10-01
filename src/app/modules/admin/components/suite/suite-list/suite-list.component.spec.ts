import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuiteListComponent } from './suite-list.component';

describe('SuiteListComponent', () => {
  let component: SuiteListComponent;
  let fixture: ComponentFixture<SuiteListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SuiteListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

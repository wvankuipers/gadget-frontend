import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovalPageComponent } from './approval-page.component';

describe('PageComponent', () => {
  let component: ApprovalPageComponent;
  let fixture: ComponentFixture<ApprovalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

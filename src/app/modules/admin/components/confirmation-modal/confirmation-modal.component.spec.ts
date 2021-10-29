import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MockModule } from 'ng-mocks';
import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let MatDialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmationModalComponent>>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfirmationModalComponent],
        imports: [MockModule(MatDialogModule), MockModule(MatIconModule)],
        providers: [
          {
            provide: MatDialogRef,
            useFactory: (): jasmine.SpyObj<MatDialogRef<ConfirmationModalComponent>> => {
              MatDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

              return MatDialogRefSpy;
            },
          },
          {
            provide: MAT_DIALOG_DATA,
            useValue: {},
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

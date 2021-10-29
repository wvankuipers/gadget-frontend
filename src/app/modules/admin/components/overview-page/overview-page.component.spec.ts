import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MockModule } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification.service';
import { OverviewPageComponent } from './overview-page.component';

describe('OverviewPageComponent', () => {
  let component: OverviewPageComponent;
  let fixture: ComponentFixture<OverviewPageComponent>;
  let NotificationServiceSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OverviewPageComponent],
        imports: [
          MockModule(MatSnackBarModule),
          MockModule(MatDialogModule),
          MockModule(MatIconModule),
          MockModule(MatCardModule),
          MockModule(MatTableModule),
        ],
        providers: [
          {
            provide: NotificationService,
            useFactory: (): jasmine.SpyObj<NotificationService> => {
              NotificationServiceSpy = jasmine.createSpyObj('NotificationService', ['checkNotifications']);

              return NotificationServiceSpy;
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewPageComponent);
    component = fixture.componentInstance;

    component.dataSource$ = EMPTY;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

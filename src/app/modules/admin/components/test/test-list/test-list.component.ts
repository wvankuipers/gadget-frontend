import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { NotificationService } from '../../../../shared/services/notification.service';
import { OverviewPageMessages } from '../../../domain/message';
import { ColumnModel } from '../../../domain/table';
import { TestDTO } from '../../../domain/test';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestListComponent {
  public columns: ColumnModel[] = [
    { key: 'name', canSort: true },
    { key: 'project', canSort: true },
    { key: 'suite', canSort: true },
    { key: 'run', canSort: true },
    { key: 'created', canSort: true },
    { key: 'updated', canSort: true },
  ];

  public tableColumns: string[] = ['select', 'name', 'project', 'suite', 'run', 'created', 'updated', 'actions'];

  public messages: OverviewPageMessages = {
    deleteConfirmationTitle: {
      single: 'Delete test',
      multiple: 'Delete {{number}} tests',
    },
    deleteConfirmationMessage: {
      single: 'Are you certain you want to delete the selected test?',
      multiple: 'Are you certain you want to delete the selected {{number}} tests?',
    },
    deleteNotification: {
      single: 'Test deleted!',
      multiple: '{{number}} tests deleted!',
    },
    saveNotification: 'Test saved!',
    createNotification: 'Test created!',
    itemLabel: 'test',
  };

  public testServiceList$: Observable<TestDTO[]>;

  private refresh$ = new BehaviorSubject(undefined);

  constructor(
    private testService: TestService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    this.testServiceList$ = this.refresh$.pipe(switchMap(() => this.testService.list()));
  }

  deleteTests(selectedTests: string[]): void {
    this.testService
      .delete(selectedTests)
      .pipe(tap(() => this.refresh$.next(undefined)))
      .subscribe(() => this.displayDeletedNotification(selectedTests.length));
  }

  private displayDeletedNotification(selectedTestsLength: number): void {
    let deleteNotificationMessage = this.messages.deleteNotification.single;

    if (selectedTestsLength > 1) {
      deleteNotificationMessage = NotificationService.formatMessage(
        this.messages.deleteNotification.multiple,
        '{{number}}',
        selectedTestsLength.toString()
      );
    }

    this.notificationService.triggerNotification(deleteNotificationMessage);
  }
}

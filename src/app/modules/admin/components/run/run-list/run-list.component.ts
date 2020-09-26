import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { OverviewPageMessages } from '../../../domain/message';
import { RunDTO, RunId } from '../../../domain/run';
import { ColumnModel } from '../../../domain/table';
import { RunService } from '../../../services/run.service';

@Component({
  selector: 'app-run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunListComponent {
  public columns: ColumnModel[] = [
    { key: 'nr', canSort: true },
    { key: 'project', canSort: true },
    { key: 'suite', canSort: true },
    { key: 'tests' },
    { key: 'created', canSort: true },
    { key: 'updated', canSort: true },
  ];

  public tableColumns: string[] = ['select', 'nr', 'project', 'suite', 'tests', 'created', 'updated', 'actions'];

  public messages: OverviewPageMessages = {
    deleteConfirmationTitle: {
      single: 'Delete run',
      multiple: 'Delete {{number}} runs',
    },
    deleteConfirmationMessage: {
      single: 'Are you certain you want to delete the selected run?',
      multiple: 'Are you certain you want to delete the selected {{number}} runs?',
    },
    deleteNotification: {
      single: 'Run deleted!',
      multiple: '{{number}} runs deleted!',
    },
    saveNotification: 'Run saved!',
    createNotification: 'Run created!',
    itemLabel: 'run',
  };

  public runServiceList$: Observable<RunDTO[]>;

  constructor(
    private runService: RunService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    this.runServiceList$ = this.runService.list();
  }

  deleteRuns(selectedRuns: string[]): void {
    this.runService.delete(selectedRuns).subscribe(() => this.displayDeletedNotification(selectedRuns.length));
  }

  editRun(runId: RunId): void {
    this.router.navigate(['admin', 'run', runId]);
  }

  private displayDeletedNotification(selectedRunsLength: number): void {
    let deleteNotificationMessage = this.messages.deleteNotification.single;

    if (selectedRunsLength > 1) {
      deleteNotificationMessage = NotificationService.formatMessage(
        this.messages.deleteNotification.multiple,
        '{{number}}',
        selectedRunsLength.toString()
      );
    }

    this.notificationService.triggerNotification(deleteNotificationMessage);
  }
}

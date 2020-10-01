import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { OverviewPageMessages } from '../../../domain/message';
import { SuiteDTO, SuiteId } from '../../../domain/suite';
import { ColumnModel } from '../../../domain/table';
import { SuiteService } from '../../../services/suite.service';

@Component({
  selector: 'app-suite-list',
  templateUrl: './suite-list.component.html',
  styleUrls: ['./suite-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuiteListComponent {
  public columns: ColumnModel[] = [
    { key: 'name', canSort: true },
    { key: 'slug', canSort: true, noCapitalize: true },
    { key: 'project', canSort: true },
    { key: 'runs' },
    { key: 'created', canSort: true },
    { key: 'updated', canSort: true },
  ];

  public tableColumns: string[] = ['select', 'name', 'slug', 'project', 'runs', 'created', 'updated', 'actions'];

  public messages: OverviewPageMessages = {
    deleteConfirmationTitle: {
      single: 'Delete suite',
      multiple: 'Delete {{number}} suites',
    },
    deleteConfirmationMessage: {
      single: 'Are you certain you want to delete the selected suite?',
      multiple: 'Are you certain you want to delete the selected {{number}} suites?',
    },
    deleteNotification: {
      single: 'Suite deleted!',
      multiple: '{{number}} suites deleted!',
    },
    saveNotification: 'Suite saved!',
    createNotification: 'Suite created!',
    itemLabel: 'suite',
  };

  public suiteServiceList$: Observable<SuiteDTO[]>;

  constructor(
    private suiteService: SuiteService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    this.suiteServiceList$ = this.suiteService.list();
  }

  createSuite(): void {
    this.router.navigate(['admin', 'suite', 'create']);
  }

  editSuite(suiteId: SuiteId): void {
    this.router.navigate(['admin', 'suite', suiteId]);
  }

  deleteSuites(selectedSuites: string[]): void {
    this.suiteService.delete(selectedSuites).subscribe(() => this.displayDeletedNotification(selectedSuites.length));
  }

  private displayDeletedNotification(selectedSuitesLength: number): void {
    let deleteNotificationMessage = this.messages.deleteNotification.single;

    if (selectedSuitesLength > 1) {
      deleteNotificationMessage = NotificationService.formatMessage(
        this.messages.deleteNotification.multiple,
        '{{number}}',
        selectedSuitesLength.toString()
      );
    }

    this.notificationService.triggerNotification(deleteNotificationMessage);
  }
}

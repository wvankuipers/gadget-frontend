import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { OverviewPageMessages } from '../../../domain/message';
import { ProjectDTO, ProjectId } from '../../../domain/project';
import { ColumnModel } from '../../../domain/table';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent {
  public columns: ColumnModel[] = [
    { key: 'name', canSort: true },
    { key: 'created', canSort: true },
    { key: 'updated', canSort: true },
    { key: 'slug', canSort: true, noCapitalize: true },
    { key: 'suites' },
  ];

  public tableColumns: string[] = ['select', 'name', 'created', 'updated', 'slug', 'suites', 'actions'];

  public messages: OverviewPageMessages = {
    deleteConfirmationTitle: {
      single: 'Delete project',
      multiple: 'Delete {{number}} projects',
    },
    deleteConfirmationMessage: {
      single: 'Are you certain you want to delete the selected project?',
      multiple: 'Are you certain you want to delete the selected {{number}} projects?',
    },
    deleteNotification: {
      single: 'Project deleted!',
      multiple: '{{number}} projects deleted!',
    },
    saveNotification: 'Project saved!',
    createNotification: 'Project created!',
    itemLabel: 'project',
  };

  public projectServiceList$: Observable<ProjectDTO[]>;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    this.projectServiceList$ = this.projectService.list();
  }

  createProject(): void {
    this.router.navigate(['admin', 'project', 'create']);
  }

  editProject(projectId: ProjectId): void {
    this.router.navigate(['admin', 'project', projectId]);
  }

  deleteProjects(selectedProjects: string[]): void {
    this.projectService
      .delete(selectedProjects)
      .subscribe(() => this.displayDeletedNotification(selectedProjects.length));
  }

  private displayDeletedNotification(selectedProjectsLength: number): void {
    let deleteNotificationMessage = this.messages.deleteNotification.single;

    if (selectedProjectsLength > 1) {
      deleteNotificationMessage = NotificationService.formatMessage(
        this.messages.deleteNotification.multiple,
        '{{number}}',
        selectedProjectsLength.toString()
      );
    }

    this.notificationService.triggerNotification(deleteNotificationMessage);
  }
}

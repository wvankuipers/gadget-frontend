import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { NotificationType } from '../../../shared/domain/notification';
import { NotificationService } from '../../../shared/services/notification.service';
import { GadgetItem } from '../../domain/gadget-item';
import { OverviewPageMessages } from '../../domain/message';
import { ModalType } from '../../domain/modal';
import { Project } from '../../domain/project';
import { ColumnModel } from '../../domain/table';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewPageComponent implements OnInit {
  @HostBinding('class.overview-page')
  overviewPage = true;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  @Input() title = '';
  @Input() tableColumns: string[] = [];
  @Input() disableSelect = false;
  @Input() disableActions = false;
  @Input() dataSource$: Observable<GadgetItem[]> = of();
  @Input() messages: OverviewPageMessages = {
    deleteConfirmationTitle: {
      single: 'Delete item',
      multiple: 'Delete {{number}} items',
    },
    deleteConfirmationMessage: {
      single: 'Are you certain you want to delete the selected item?',
      multiple: 'Are you certain you want to delete the selected {{number}} items?',
    },
    deleteNotification: {
      single: 'Item deleted!',
      multiple: '{{number}} items deleted!',
    },
    saveNotification: 'Item saved!',
    createNotification: 'Item created!',
    itemLabel: 'item',
  };

  @Input() set columns(value: ColumnModel[]) {
    this.columnModels = value;
    this.tableColumns = value.map((column: ColumnModel) => column.key);

    if (!this.disableSelect) {
      this.tableColumns = ['select', ...this.tableColumns];
    }

    if (!this.disableActions) {
      this.tableColumns.push('actions');
    }

    this.cdr.detectChanges();
  }

  get columns(): ColumnModel[] {
    return this.columnModels;
  }

  @Output() create: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();

  public dataSource: MatTableDataSource<GadgetItem> = new MatTableDataSource();
  public selection = new SelectionModel<GadgetItem>(true, []);
  public isDeleteButtonDisabled = true;

  private columnModels: ColumnModel[] = [];

  constructor(
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataSource$.subscribe((items: GadgetItem[]) => {
      this.dataSource.data = items;
      this.dataSource.sort = this.sort;

      this.cdr.detectChanges();
    });

    this.notificationService.checkNotifications(
      {
        type: NotificationType.Save,
        message: this.messages.saveNotification,
      },
      {
        type: NotificationType.Create,
        message: this.messages.createNotification,
      },
      {
        type: NotificationType.Delete,
        message: this.messages.deleteNotification.single,
      }
    );
  }

  confirmDelete(itemId?: string): void {
    let selectedItems: string[] = this.selection.selected.map((item: GadgetItem) => item.id).filter(Project.notEmpty);

    if (itemId) {
      selectedItems = [itemId];
    }

    let deleteConfirmationTitle = this.messages.deleteConfirmationTitle.single;
    let deleteConfirmationMessage = this.messages.deleteConfirmationMessage.single;

    const selectedItemsLength = selectedItems.length;
    if (selectedItemsLength > 1) {
      deleteConfirmationTitle = NotificationService.formatMessage(
        this.messages.deleteConfirmationTitle.multiple,
        '{{number}}',
        selectedItemsLength.toString()
      );
      deleteConfirmationMessage = NotificationService.formatMessage(
        this.messages.deleteConfirmationMessage.multiple,
        '{{number}}',
        selectedItemsLength.toString()
      );
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: deleteConfirmationTitle,
        message: deleteConfirmationMessage,
        modalType: ModalType.Delete,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed === true) {
        this.delete.emit(selectedItems);
      }
    });
  }

  createItem(): void {
    this.create.emit();
  }

  editItem(itemId: string): void {
    this.edit.emit(itemId);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}

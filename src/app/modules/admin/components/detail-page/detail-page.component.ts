import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { ModalType } from '../../domain/modal';
import { PageActonType } from '../../domain/page';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPageComponent implements OnInit {
  @HostBinding('class.detail-page')
  detailPage = true;

  @Input() title!: string;
  @Input() formGroup!: FormGroup;

  @Input() inEditMode = false;

  @Input() set disabledActions(pageActions: PageActonType[]) {
    pageActions.forEach((pageActionType: PageActonType) => {
      this.enabledPageActionMap.set(pageActionType, false);
    });

    this.cdr.markForCheck();
  }

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  get isSaveButtonDisabled(): boolean {
    return !(this.enabledPageActionMap.get(PageActonType.Save) || false);
  }

  get isDeleteButtonDisabled(): boolean {
    return !(this.enabledPageActionMap.get(PageActonType.Delete) || false);
  }

  get isCancelButtonDisabled(): boolean {
    return !(this.enabledPageActionMap.get(PageActonType.Cancel) || false);
  }

  private enabledPageActionMap: Map<PageActonType, boolean> = new Map([
    [PageActonType.Save, true],
    [PageActonType.Delete, true],
    [PageActonType.Cancel, true],
  ]);

  constructor(private cdr: ChangeDetectorRef, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete item',
        message: 'Are you certain you want to delete this item?',
        modalType: ModalType.Delete,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed === true) {
        this.delete.emit();
      }
    });
  }
}

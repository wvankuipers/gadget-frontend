import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { NotificationType } from '../../../../shared/domain/notification';
import { RunDTO, RunId } from '../../../domain/run';
import { Suite, SuiteId } from '../../../domain/suite';
import { RunService } from '../../../services/run.service';
import { SuiteService } from '../../../services/suite.service';

@Component({
  selector: 'app-run-detail',
  templateUrl: './run-detail.component.html',
  styleUrls: ['./run-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunDetailComponent implements OnInit {
  @HostBinding('class.run-detail-page')
  runDetailPage = true;

  public run$!: Observable<RunDTO>;
  public suites$!: Observable<Suite[]>;
  public form!: FormGroup;
  public inEditMode = false;
  public get selectedSuite(): SuiteId | undefined {
    return this.run?.suite?.id;
  }
  public set selectedSuite(value: SuiteId | undefined) {
    if (!value) {
      this.run.suite = undefined;
      return;
    }

    this.run.suite = this.suites.find((suite) => suite.id === value);
  }

  private slugControl = new FormControl('');
  private runId!: RunId | null;
  private run!: RunDTO;
  private suites!: Suite[];

  constructor(
    private router: Router,
    private runService: RunService,
    private route: ActivatedRoute,
    private suiteService: SuiteService,
    fb: FormBuilder
  ) {
    this.run$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id: string | null = params.get('id');

        if (typeof id === 'string') {
          this.runId = id;
          return this.runService.get(this.runId).pipe(tap((run) => (this.run = run)));
        }

        return EMPTY;
      }),
      tap((run: RunDTO) => {
        this.form = fb.group({
          nr: new FormControl(run.nr),
          suite: new FormControl(run?.suite?.id),
          created: new FormControl({ value: run.created, disabled: true }),
          updated: new FormControl({ value: run.updated, disabled: true }),
        });
      })
    );

    this.suites$ = this.suiteService.list().pipe(tap((suites) => (this.suites = suites)));
  }

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['admin', 'run']);
  }

  save(): void {
    this.slugControl.setValue(Suite.sanitizeSlug(this.slugControl.value, true));

    const save$ = this.runService.save(this.runId, this.form.value as RunDTO);
    const notification = NotificationType.Save;

    save$.subscribe(() =>
      this.router.navigate(['admin', 'run'], {
        state: {
          data: {
            notification,
          },
        },
      })
    );
  }

  delete(): void {
    this.runService.delete([this.runId]).subscribe(() => {
      this.router.navigate(['admin', 'run'], {
        state: {
          data: {
            notification: NotificationType.Delete,
          },
        },
      });
    });
  }
}

import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { NotificationType } from '../../../../shared/domain/notification';
import { Project, ProjectId } from '../../../domain/project';
import { Suite, SuiteDTO, SuiteId } from '../../../domain/suite';
import { ProjectService } from '../../../services/project.service';
import { SuiteService } from '../../../services/suite.service';

@Component({
  selector: 'app-suite-detail',
  templateUrl: './suite-detail.component.html',
  styleUrls: ['./suite-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuiteDetailComponent implements OnInit {
  @HostBinding('class.suite-detail-page')
  suiteDetailPage = true;

  public suite$!: Observable<SuiteDTO>;
  public projects$!: Observable<Project[]>;
  public form!: FormGroup;
  public inEditMode = false;
  public get selectedProject(): ProjectId | undefined {
    return this.suite?.project?.id;
  }
  public set selectedProject(value: ProjectId | undefined) {
    if (!value) {
      this.suite.project = undefined;
      return;
    }

    this.suite.project = this.projects.find((project) => project.id === value);
  }

  private slugControl = new FormControl('');
  private suiteId!: SuiteId | null;
  private suite!: SuiteDTO;
  private projects!: Project[];

  constructor(
    private router: Router,
    private suiteService: SuiteService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    fb: FormBuilder
  ) {
    this.suite$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id: string | null = params.get('id');

        if (typeof id === 'string') {
          if (id === 'create') {
            return of(this.createNewSuite());
          }

          this.inEditMode = true;
          this.suiteId = id;
          return this.suiteService.get(this.suiteId).pipe(tap((suite) => (this.suite = suite)));
        }

        return EMPTY;
      }),
      tap((suite: SuiteDTO) => {
        this.slugControl.valueChanges
          .pipe(
            map((value: string) => Suite.sanitizeSlug(value)),
            filter((sanitizedValue: string) => sanitizedValue !== this.slugControl.value)
          )
          .subscribe((sanitizedValue: string) => this.slugControl.setValue(sanitizedValue));

        this.slugControl.setValue(suite.slug);

        this.form = fb.group({
          name: new FormControl(suite.name),
          slug: this.slugControl,
          project: new FormControl(suite?.project?.id),
          created: new FormControl({ value: suite.created, disabled: true }),
          updated: new FormControl({ value: suite.updated, disabled: true }),
        });
      })
    );

    this.projects$ = this.projectService.list().pipe(tap((projects) => (this.projects = projects)));
  }

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['admin', 'suite']);
  }

  save(): void {
    this.slugControl.setValue(Suite.sanitizeSlug(this.slugControl.value, true));

    let save$ = this.suiteService.create(this.form.value as SuiteDTO);
    let notification = NotificationType.Create;

    if (this.inEditMode) {
      save$ = this.suiteService.save(this.suiteId, this.form.value as SuiteDTO);
      notification = NotificationType.Save;
    }

    save$.subscribe(() =>
      this.router.navigate(['admin', 'suite'], {
        state: {
          data: {
            notification,
          },
        },
      })
    );
  }

  delete(): void {
    this.suiteService.delete([this.suiteId]).subscribe(() => {
      this.router.navigate(['admin', 'suite'], {
        state: {
          data: {
            notification: NotificationType.Delete,
          },
        },
      });
    });
  }

  private createNewSuite(): SuiteDTO {
    return new Suite();
  }
}

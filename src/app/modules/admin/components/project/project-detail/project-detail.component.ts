import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { NotificationType } from '../../../../shared/domain/notification';
import { Project, ProjectDTO, ProjectId } from '../../../domain/project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent implements OnInit {
  @HostBinding('class.project-detail-page')
  projectDetailPage = true;

  public project$!: Observable<ProjectDTO>;
  public form!: FormGroup;
  public inEditMode = false;

  private slugControl = new FormControl('');
  private projectId!: ProjectId | null;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id: string | null = params.get('id');

        if (typeof id === 'string') {
          if (id === 'create') {
            return of(this.createNewProject());
          }

          this.inEditMode = true;
          this.projectId = id;
          return this.projectService.get(this.projectId);
        }

        return EMPTY;
      }),
      tap((project: ProjectDTO) => {
        this.slugControl.valueChanges
          .pipe(
            map((value: string) => Project.sanitizeSlug(value)),
            filter((sanitizedValue: string) => sanitizedValue !== this.slugControl.value)
          )
          .subscribe((sanitizedValue: string) => this.slugControl.setValue(sanitizedValue));

        this.slugControl.setValue(project.slug);

        this.form = fb.group({
          name: new FormControl(project.name),
          slug: this.slugControl,
          created: new FormControl({ value: project.created, disabled: true }),
          updated: new FormControl({ value: project.updated, disabled: true }),
        });
      })
    );
  }

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['admin', 'project']);
  }

  save(): void {
    this.slugControl.setValue(Project.sanitizeSlug(this.slugControl.value, true));

    let save$ = this.projectService.create(this.form.value as ProjectDTO);
    let notification = NotificationType.Create;

    if (this.inEditMode) {
      save$ = this.projectService.save(this.projectId, this.form.value as ProjectDTO);
      notification = NotificationType.Save;
    }

    save$.subscribe(() =>
      this.router.navigate(['admin', 'project'], {
        state: {
          data: {
            notification,
          },
        },
      })
    );
  }

  delete(): void {
    this.projectService.delete([this.projectId]).subscribe(() => {
      this.router.navigate(['admin', 'project'], {
        state: {
          data: {
            notification: NotificationType.Delete,
          },
        },
      });
    });
  }

  private createNewProject(): ProjectDTO {
    return new Project();
  }
}

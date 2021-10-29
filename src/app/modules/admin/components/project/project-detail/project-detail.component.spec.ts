import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { ProjectService } from '../../../services/project.service';
import { ProjectDetailComponent } from './project-detail.component';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let ProjectServiceSpy: jasmine.SpyObj<ProjectService>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProjectDetailComponent],
        imports: [RouterTestingModule, ReactiveFormsModule],
        providers: [
          {
            provide: ProjectService,
            useFactory: (): jasmine.SpyObj<ProjectService> => {
              ProjectServiceSpy = jasmine.createSpyObj('ProjectService', ['get']);

              ProjectServiceSpy.get.and.returnValue(EMPTY);

              return ProjectServiceSpy;
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

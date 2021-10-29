import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { ProjectService } from '../../../services/project.service';
import { SuiteService } from '../../../services/suite.service';
import { SuiteDetailComponent } from './suite-detail.component';

describe('SuiteDetailComponent', () => {
  let component: SuiteDetailComponent;
  let fixture: ComponentFixture<SuiteDetailComponent>;
  let RouterSpy: jasmine.SpyObj<Router>;
  let SuiteServiceSpy: jasmine.SpyObj<SuiteService>;
  let ProjectServiceSpy: jasmine.SpyObj<ProjectService>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SuiteDetailComponent],
        imports: [RouterTestingModule, ReactiveFormsModule],
        providers: [
          {
            provide: SuiteService,
            useFactory: (): jasmine.SpyObj<SuiteService> => {
              SuiteServiceSpy = jasmine.createSpyObj('SuiteService', ['get']);

              SuiteServiceSpy.get.and.returnValue(EMPTY);

              return SuiteServiceSpy;
            },
          },
          {
            provide: ProjectService,
            useFactory: (): jasmine.SpyObj<ProjectService> => {
              ProjectServiceSpy = jasmine.createSpyObj('ProjectService', ['list']);

              ProjectServiceSpy.list.and.returnValue(EMPTY);

              return ProjectServiceSpy;
            },
          },
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(convertToParamMap({ id: '1' })),
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

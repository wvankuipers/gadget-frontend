import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { RunService } from '../../../services/run.service';
import { SuiteService } from '../../../services/suite.service';
import { RunDetailComponent } from './run-detail.component';

describe('RunDetailComponent', () => {
  let component: RunDetailComponent;
  let fixture: ComponentFixture<RunDetailComponent>;
  let RouterSpy: jasmine.SpyObj<Router>;
  let RunServiceSpy: jasmine.SpyObj<RunService>;
  let SuiteServiceSpy: jasmine.SpyObj<SuiteService>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RunDetailComponent],
        imports: [MockModule(MatDialogModule), RouterTestingModule, ReactiveFormsModule],
        providers: [
          {
            provide: RunService,
            useFactory: (): jasmine.SpyObj<RunService> => {
              RunServiceSpy = jasmine.createSpyObj('RunService', ['get']);

              return RunServiceSpy;
            },
          },

          {
            provide: SuiteService,
            useFactory: (): jasmine.SpyObj<SuiteService> => {
              SuiteServiceSpy = jasmine.createSpyObj('SuiteService', ['get', 'list']);

              SuiteServiceSpy.list.and.returnValue(EMPTY);

              return SuiteServiceSpy;
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RunDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

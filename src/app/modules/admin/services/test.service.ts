import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_CONFIG } from '../../app-config/app-config.module';
import { AppConfig } from '../../app-config/domain/app-config';
import { Test, TestDTO, TestId } from '../domain/test';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  list(): Observable<Test[]> {
    return this.httpClient.get<TestDTO[]>(`${this.config.backendUrl}/test/`).pipe(map(this.mapToModels));
  }

  // create(formValues: TestDTO): Observable<void> {
  //   return this.httpClient.post<void>(`${this.config.backendUrl}/test/`, formValues);
  // }

  get(testId: TestId | null): Observable<Test> {
    this.validateTestId(testId);

    return this.httpClient.get<TestDTO>(`${this.config.backendUrl}/test/${testId}`).pipe(map(this.mapToModel));
  }

  // save(testId: TestId | null, formValues: TestDTO): Observable<void> {
  //   this.validateTestId(testId);

  //   return this.httpClient.post<void>(`${this.config.backendUrl}/test/${testId}`, formValues);
  // }

  delete(testIds: (TestId | null)[]): Observable<void[]> {
    const observables: Observable<void>[] = [];
    for (const testId of testIds) {
      this.validateTestId(testId);

      observables.push(this.httpClient.delete<void>(`${this.config.backendUrl}/test/${testId}`));
    }

    return combineLatest(observables);
  }

  private validateTestId(testId: TestId | null | (TestId | null)[]): void {
    if (Array.isArray(testId)) {
      testId = testId.filter(Test.notEmpty);
    }

    if (!testId) {
      throw new Error('Missing id for test!');
    }
  }

  private mapToModels(models: TestDTO[]): Test[] {
    return models.map((test) => new Test(test));
  }

  private mapToModel(model: TestDTO): Test {
    return new Test(model);
  }
}

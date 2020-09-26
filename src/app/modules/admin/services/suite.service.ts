import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_CONFIG } from '../../app-config/app-config.module';
import { AppConfig } from '../../app-config/domain/app-config';
import { Suite, SuiteDTO, SuiteId } from '../domain/suite';

@Injectable({
  providedIn: 'root',
})
export class SuiteService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  list(): Observable<Suite[]> {
    return this.httpClient.get<SuiteDTO[]>(`${this.config.backendUrl}/suite/`).pipe(map(this.mapToModels));
  }

  create(formValues: SuiteDTO): Observable<void> {
    return this.httpClient.post<void>(`${this.config.backendUrl}/suite/`, formValues);
  }

  get(suiteId: SuiteId | null): Observable<Suite> {
    this.validateSuiteId(suiteId);

    return this.httpClient.get<SuiteDTO>(`${this.config.backendUrl}/suite/${suiteId}`).pipe(map(this.mapToModel));
  }

  save(suiteId: SuiteId | null, formValues: SuiteDTO): Observable<void> {
    this.validateSuiteId(suiteId);

    return this.httpClient.post<void>(`${this.config.backendUrl}/suite/${suiteId}`, formValues);
  }

  delete(suiteIds: (SuiteId | null)[]): Observable<void[]> {
    const observables: Observable<void>[] = [];
    for (const suiteId of suiteIds) {
      this.validateSuiteId(suiteId);

      observables.push(this.httpClient.delete<void>(`${this.config.backendUrl}/suite/${suiteId}`));
    }

    return combineLatest(observables);
  }

  private validateSuiteId(suiteId: SuiteId | null | (SuiteId | null)[]): void {
    if (Array.isArray(suiteId)) {
      suiteId = suiteId.filter(Suite.notEmpty);
    }

    if (!suiteId) {
      throw new Error('Missing id for suite!');
    }
  }

  private mapToModels(models: SuiteDTO[]): Suite[] {
    return models.map((suite) => new Suite(suite));
  }

  private mapToModel(model: SuiteDTO): Suite {
    return new Suite(model);
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_CONFIG } from '../../app-config/app-config.module';
import { AppConfig } from '../../app-config/domain/app-config';
import { Run, RunDTO, RunId } from '../domain/run';

@Injectable({
  providedIn: 'root',
})
export class RunService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  list(): Observable<Run[]> {
    return this.httpClient.get<RunDTO[]>(`${this.config.backendUrl}/run/`).pipe(map(this.mapToModels));
  }

  // create(formValues: RunDTO): Observable<void> {
  //   return this.httpClient.post<void>(`${this.config.backendUrl}/run/`, formValues);
  // }

  get(runId: RunId | null): Observable<Run> {
    this.validateRunId(runId);

    return this.httpClient.get<RunDTO>(`${this.config.backendUrl}/run/${runId}`).pipe(map(this.mapToModel));
  }

  save(runId: RunId | null, formValues: RunDTO): Observable<void> {
    this.validateRunId(runId);

    return this.httpClient.post<void>(`${this.config.backendUrl}/run/${runId}`, formValues);
  }

  delete(runIds: (RunId | null)[]): Observable<void[]> {
    const observables: Observable<void>[] = [];
    for (const runId of runIds) {
      this.validateRunId(runId);

      observables.push(this.httpClient.delete<void>(`${this.config.backendUrl}/run/${runId}`));
    }

    return combineLatest(observables);
  }

  private validateRunId(runId: RunId | null | (RunId | null)[]): void {
    if (Array.isArray(runId)) {
      runId = runId.filter(Run.notEmpty);
    }

    if (!runId) {
      throw new Error('Missing id for run!');
    }
  }

  private mapToModels(models: RunDTO[]): Run[] {
    return models.map((run) => new Run(run));
  }

  private mapToModel(model: RunDTO): Run {
    return new Run(model);
  }
}

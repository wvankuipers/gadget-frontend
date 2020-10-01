import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_CONFIG } from '../../app-config/app-config.module';
import { AppConfig } from '../../app-config/domain/app-config';
import { Project, ProjectDTO, ProjectId } from '../domain/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  list(): Observable<Project[]> {
    return this.httpClient.get<ProjectDTO[]>(`${this.config.backendUrl}/project/`).pipe(map(this.mapToModels));
  }

  create(formValues: ProjectDTO): Observable<void> {
    return this.httpClient.post<void>(`${this.config.backendUrl}/project/`, formValues);
  }

  get(projectId: ProjectId | null): Observable<Project> {
    this.validateProjectId(projectId);

    return this.httpClient.get<ProjectDTO>(`${this.config.backendUrl}/project/${projectId}`).pipe(map(this.mapToModel));
  }

  save(projectId: ProjectId | null, formValues: ProjectDTO): Observable<void> {
    this.validateProjectId(projectId);

    return this.httpClient.post<void>(`${this.config.backendUrl}/project/${projectId}`, formValues);
  }

  delete(projectIds: (ProjectId | null)[]): Observable<void[]> {
    const observables: Observable<void>[] = [];
    for (const projectId of projectIds) {
      this.validateProjectId(projectId);

      observables.push(this.httpClient.delete<void>(`${this.config.backendUrl}/project/${projectId}`));
    }

    return combineLatest(observables);
  }

  private validateProjectId(projectId: ProjectId | null | (ProjectId | null)[]): void {
    if (Array.isArray(projectId)) {
      projectId = projectId.filter(Project.notEmpty);
    }

    if (!projectId) {
      throw new Error('Missing id for project!');
    }
  }

  private mapToModels(models: ProjectDTO[]): Project[] {
    return models.map((project) => new Project(project));
  }

  private mapToModel(model: ProjectDTO): Project {
    return new Project(model);
  }
}

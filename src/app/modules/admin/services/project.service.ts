import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../app-config/app-config.module';
import { AppConfig } from '../../app-config/domain/app-config';
import { Project, ProjectDTO, ProjectId } from '../domain/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  list(): Observable<ProjectDTO[]> {
    return this.httpClient.get<ProjectDTO[]>(`${this.config.backendUrl}/project/`);
  }

  create(formValues: ProjectDTO): Observable<void> {
    return this.httpClient.post<void>(`${this.config.backendUrl}/project/`, formValues);
  }

  get(projectId: ProjectId | null): Observable<ProjectDTO> {
    this.validateProjectId(projectId);

    return this.httpClient.get<ProjectDTO>(`${this.config.backendUrl}/project/${projectId}`);
  }

  save(projectId: ProjectId | null, formValues: ProjectDTO): Observable<void> {
    this.validateProjectId(projectId);

    return this.httpClient.post<void>(`${this.config.backendUrl}/project/${projectId}`, formValues);
  }

  delete(projectId: (ProjectId | null)[]): Observable<void> {
    this.validateProjectId(projectId);

    return this.httpClient.delete<void>(`${this.config.backendUrl}/project/${projectId}`);
  }

  private validateProjectId(projectId: ProjectId | null | (ProjectId | null)[]): void {
    if (Array.isArray(projectId)) {
      projectId = projectId.filter(Project.notEmpty);
    }

    if (!projectId) {
      throw new Error('Missing id for project!');
    }
  }
}

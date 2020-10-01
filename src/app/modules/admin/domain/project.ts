import { GadgetItemDTO } from './gadget-item';
import { SuiteId } from './suite';

export type ProjectId = string;

export interface ProjectDTO extends GadgetItemDTO {
  id?: ProjectId;
  name: string;
  slug: string;
  suites: SuiteId[];
}

export class Project implements ProjectDTO {
  public id?: ProjectId;
  public name = '';
  public slug = '';
  public suites: SuiteId[] = [];
  public created?: Date;
  public updated?: Date;

  static notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  static sanitizeSlug(value: string, isFinal = false): string {
    let sanitizedValue = value
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, ''); // Trim - from start of text

    /* Make sure we don't remove the ending `-` when a user is still providing input */
    if (isFinal) {
      sanitizedValue = sanitizedValue.replace(/-+$/, ''); // Trim - from end of text
    }

    return sanitizedValue;
  }

  constructor(project?: ProjectDTO) {
    if (project) {
      this.id = project.id;
      this.name = project.name;
      this.slug = project.slug;
      this.suites = project.suites || [];

      this.created = project.created ? new Date(project.created) : undefined;
      this.updated = project.updated ? new Date(project.updated) : undefined;
    }
  }
}

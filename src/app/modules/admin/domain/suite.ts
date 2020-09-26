import { GadgetItemDTO } from './gadget-item';
import { ProjectDTO } from './project';
import { RunId } from './run';

export type SuiteId = string;

export interface SuiteDTO extends GadgetItemDTO {
  id?: SuiteId;
  name: string;
  slug: string;
  runs: RunId[];
  project?: ProjectDTO;
}

export class Suite implements SuiteDTO {
  public id?: SuiteId;
  public name = '';
  public slug = '';
  public runs: RunId[] = [];
  public created?: Date;
  public updated?: Date;
  public project?: ProjectDTO;

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

  constructor(suite?: SuiteDTO) {
    if (suite) {
      this.id = suite.id;
      this.name = suite.name;
      this.slug = suite.slug;
      this.runs = suite.runs || [];
      this.project = suite.project;

      this.created = suite.created ? new Date(suite.created) : undefined;
      this.updated = suite.updated ? new Date(suite.updated) : undefined;
    }
  }
}

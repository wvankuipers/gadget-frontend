import { GadgetItem } from './gadget-item';
import { SuiteId } from './suite';

export type ProjectId = string;

export interface ProjectDTO extends GadgetItem {
  id?: ProjectId;
  name: string;
  slug: string;
  suites: SuiteId[];
}

export class Project implements ProjectDTO {
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

  constructor(
    public id?: ProjectId,
    public name = '',
    public slug = '',
    public suites: SuiteId[] = [],
    public created?: Date,
    public updated?: Date
  ) {}
}

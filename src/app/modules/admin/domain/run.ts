import { GadgetItemDTO } from './gadget-item';
import { ProjectDTO } from './project';
import { SuiteDTO } from './suite';
import { TestId } from './test';

export type RunId = string;

export interface RunDTO extends GadgetItemDTO {
  id?: RunId;
  nr: string;
  tests: TestId[];
  suite?: SuiteDTO;
}

export class Run implements RunDTO {
  public id?: RunId;
  public nr = '';
  public tests: TestId[] = [];
  public created?: Date;
  public updated?: Date;
  public suite?: SuiteDTO;
  public project?: ProjectDTO;

  static notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  constructor(run?: RunDTO) {
    if (run) {
      this.id = run.id;
      this.nr = run.nr;
      this.tests = run.tests || [];
      this.suite = run.suite;
      this.project = run.suite?.project;

      this.created = run.created ? new Date(run.created) : undefined;
      this.updated = run.updated ? new Date(run.updated) : undefined;
    }
  }
}

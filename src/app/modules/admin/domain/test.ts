import { GadgetItemDTO } from './gadget-item';
import { ProjectDTO } from './project';
import { RunDTO } from './run';
import { SuiteDTO } from './suite';

export type TestId = string;

export interface TestDTO extends GadgetItemDTO {
  id?: TestId;
  name: string;
  browser: string;
  size: string;
  key: string;
  passed: boolean;
  project?: ProjectDTO;
  suite?: SuiteDTO;
  run?: RunDTO;
}

export class Test implements TestDTO {
  public id?: TestId;
  public name = '';
  public browser = '';
  public size = '';
  public key = '';
  public passed = false;
  public created?: Date;
  public updated?: Date;
  public project?: ProjectDTO;
  public suite?: SuiteDTO;
  public run?: RunDTO;

  static notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  constructor(test?: TestDTO) {
    if (test) {
      this.id = test.id;
      this.name = test.name;
      this.browser = test.browser;
      this.size = test.size;
      this.key = test.key;
      this.passed = test.passed || false;
      this.run = test.run;
      this.suite = test.run?.suite;
      this.project = this.suite?.project;

      this.created = test.created ? new Date(test.created) : undefined;
      this.updated = test.updated ? new Date(test.updated) : undefined;
    }
  }
}

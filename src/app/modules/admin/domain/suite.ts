import { GadgetItem } from './gadget-item';

export type SuiteId = string;

export interface Suite extends GadgetItem {
  id: SuiteId;
}

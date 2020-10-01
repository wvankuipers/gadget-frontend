export enum ModalType {
  Delete = 'Delete',
  Confirmation = 'Confirmation',
}

export interface ModalData {
  title: string;
  message: string;
  modalType: ModalType;
}

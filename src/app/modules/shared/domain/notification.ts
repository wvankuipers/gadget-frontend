export enum NotificationType {
  Save = 'Save',
  Delete = 'Delete',
  Create = 'Create',
}

export interface NotificationMessage {
  type: NotificationType;
  message: string;
}

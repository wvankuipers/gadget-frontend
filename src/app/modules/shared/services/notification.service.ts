import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessage, NotificationType } from '../domain/notification';

export interface TemplateReplacement {
  key: string;
  replacement: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  static formatMessage(messageTemplate: string, key: string | TemplateReplacement[], replacement?: string): string {
    if (Array.isArray(key)) {
      key.forEach((templateReplacement: TemplateReplacement) => {
        messageTemplate = messageTemplate.replace(templateReplacement.key, templateReplacement.replacement);
      });

      return messageTemplate;
    }

    if (replacement === undefined || replacement === null) {
      throw new Error(`Format message requires a replacement string`);
    }

    return messageTemplate.replace(key, replacement);
  }

  constructor(private snackBar: MatSnackBar) {}

  checkNotifications(...notificationMessages: NotificationMessage[]): void {
    const notification: NotificationType = window.history.state?.data?.notification;

    if (notification) {
      notificationMessages.find((notificationMessage) => {
        if (notificationMessage.type === notification) {
          this.triggerNotification(notificationMessage.message);
        }
      });
    }
  }

  triggerNotification(message: string, isError = false): void {
    this.snackBar.open(message, '', {
      duration: 4000,
      panelClass: isError ? 'mat-snack-bar-container--error' : '',
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
})
export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: string, keepCase = false): string {
    if (value !== null && value !== undefined) {
      const stringValue = value.toString();

      return `${stringValue.charAt(0).toUpperCase()}${
        !keepCase ? stringValue.slice(1).toLowerCase() : stringValue.slice(1)
      }`;
    }

    return '';
  }
}

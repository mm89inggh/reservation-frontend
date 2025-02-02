import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    return date.toLocaleDateString();  // Puedes ajustar el formato según sea necesario
  }
}

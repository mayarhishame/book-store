import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oldBook',
  standalone: true,
})
export class OldBookPipe implements PipeTransform {
  transform(dateStr: string | undefined): string {
    if (!dateStr) return '';

    const year = new Date(dateStr).getFullYear();
    return year < 2010 ? '📚 This is an old book (published before 2010)' : '';
  }
}

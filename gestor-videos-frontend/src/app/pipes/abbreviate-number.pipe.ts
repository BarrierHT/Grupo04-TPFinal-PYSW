import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateNumber'
})
export class AbbreviateNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'm';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    } else {
      return value.toString();
    }
  }
}

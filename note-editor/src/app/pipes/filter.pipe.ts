import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, str: string): any {
    if (str) {
      return value.filter((item: any) =>
        item.tags.includes(str.toLocaleLowerCase())
      );
    }
    return value;
  }
}

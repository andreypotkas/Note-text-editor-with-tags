import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut',
})
export class CutPipe implements PipeTransform {
  transform(value: any, tags: any): any {
    const arr: string[] = [];
    value.split(' ').map((item: string) => {
      if (
        item[0] === '#' ||
        tags.includes(item.replace(/[^A-Za-zА-Яа-я0-9]/g, ''))
      ) {
        arr.push(item.replace(/[^A-Za-zА-Яа-я0-9]/g, ''));
      }
    });
    return arr;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string) {

    if (value.length === 0 || filterString === '') {
      return value;
    }
    const filteredArray = value.filter((item: any) =>
      item.title.toLowerCase().includes(filterString.toLowerCase())
    );
    return filteredArray;
  }

}

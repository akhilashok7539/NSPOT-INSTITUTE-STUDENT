import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
  
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
      });
    });
   }
  // transform(value: any, args?: any): any {
  //   if(!args)
  //    return value;
  //   return value.filter(
  //     item => item.product_name.toLowerCase().indexOf(args.toLowerCase()) > -1
  //  );
  // }
}

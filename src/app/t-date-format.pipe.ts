import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'tDateFormatPipe',
})
export class TDateFormatPipe implements PipeTransform {
    transform(value: any) {
        let now = new Date();
        let to_date = new Date(value);
        let datePipe = new DatePipe('en-US');
        if (to_date.getDate() === now.getDate() && to_date.getMonth() === now.getMonth() && to_date.getFullYear() === now.getFullYear()) {
            // return 'Today ' + $filter('date')(to_date.getTime(), 'H:mma')
            value = 'Today ' + (datePipe.transform(value, 'H:mm a'));
        } else {
            value = datePipe.transform(value, 'dd-MM-yyyy H:mm a');
        }
        return value;
    }
}

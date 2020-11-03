import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe extends DatePipe implements PipeTransform {

  transform(value: any): string {
    const timezoneOffset = moment(value)
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format('Z');
    return super.transform(value, 'MMM d, y, h:mm a', timezoneOffset);
  }
}

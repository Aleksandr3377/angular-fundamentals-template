import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(value: string | Date): string {
        const date = new Date(value);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
}

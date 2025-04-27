import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(minutes: number): string {
        const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
        const mins = (minutes % 60).toString().padStart(2, '0');
        const hourText = +hours === 1 ? 'hour' : 'hours';
        return `${hours}:${mins} ${hourText}`;
    }
}

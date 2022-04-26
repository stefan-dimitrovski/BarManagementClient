import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhoneFormatPipe implements PipeTransform {

    transform(value: string) {
        return value.replace(/(\d)(\d{2})(\d{3})(\d{3})/, '$1$2-$3-$4');
    }
}

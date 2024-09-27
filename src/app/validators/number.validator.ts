import { AbstractControl, ValidatorFn } from '@angular/forms';

export function rangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value === '' || value === null || typeof value === 'string' && value.trim() === '') {
      return null;
    }

    const numericValue = Number(value);
    const isNumber = !isNaN(numericValue);
    const inRange = isNumber && numericValue >= min && numericValue <= max;

    return inRange ? null : { rangeError: { min, max } };
  };
}
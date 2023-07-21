import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appCustomInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputDirective),
      multi: true
    }
  ]
})
export class CustomInputDirective implements ControlValueAccessor {
  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(private el: ElementRef) {}

  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: any): void {
    this.onChange(value);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }
}

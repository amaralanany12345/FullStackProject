import {
  Component,
  Input
} from '@angular/core'

import {
  ControlValueAccessor,
  NgControl
} from '@angular/forms'

@Component({
  selector: 'app-form-input',
  imports: [],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css'
})

export class FormInput implements ControlValueAccessor {

  @Input() label = ''
  @Input() type = 'text'
  @Input() placeholder = ''

  value = ''
  disabled = false

  private onChange: (value: string) => void = () => {}
  private onTouched: () => void = () => {}

  constructor(private ngControl: NgControl) {
    this.ngControl.valueAccessor = this
  }

  get control(){
    return this.ngControl.control
  }
  writeValue(value: string): void {
    this.value = value
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.onChange(this.value)
  }

  onBlur(): void {
    this.onTouched()
  }
}
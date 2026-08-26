import {Component,Input} from '@angular/core'
import {ControlValueAccessor,NgControl} from '@angular/forms'

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

  private onTouched: () => void = () => {}

  constructor(private ngControl: NgControl) {
    this.ngControl.valueAccessor = this
  }

  get control(){
    return this.ngControl.control
  }
  writeValue(value: string): void {
  }

  registerOnChange(fn: (value: string) => void): void {
    this.writeValue = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.writeValue(this.value)
  }

  onBlur(): void {
    this.onTouched()
  }
}
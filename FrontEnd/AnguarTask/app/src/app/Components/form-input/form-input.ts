import {Component,forwardRef,input,Input, Self} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ɵInternalFormsSharedModule } from '@angular/forms'

@Component({
  selector: 'app-form-input',
  imports: [ɵInternalFormsSharedModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
//   providers: [
//   {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => FormInput),
//     multi: true
//   }
// ]
})

export class FormInput implements ControlValueAccessor {

  @Input() label = ''
  @Input() type = 'text'
  @Input() placeholder = ''
  @Input() controlFormName='name'
  
  value = ''
  disabled=false

  private onTouched: () => void = () => {}
  private onChanged: (value:string) => void = () => {}

  constructor(@Self() private ngControl: NgControl) {
    this.ngControl.valueAccessor = this
  }

  get control(){
    return this.ngControl.control
  }

  writeValue(value: string): void {
    this.value=value 
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChanged=fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched=fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled=isDisabled
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.onChanged(this.value)
  }

  onBlur(): void {
    this.onTouched()
  }
}
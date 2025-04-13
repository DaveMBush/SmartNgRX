import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  input,
  output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'dmb-node-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './node-editor.component.html',
  styleUrl: './node-editor.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(function forwardRefInner() {
        return NodeEditorComponent;
      }),
      multi: true,
    },
  ],
})
export class NodeEditorComponent
  implements ControlValueAccessor, AfterViewInit
{
  value = '';
  disabled = false;
  onChange(_: string): void {
    /* */
  }

  onTouched(): void {
    /* */
  }

  placeholder$ = input<string>('');
  readonly save = output<string>();
  // eslint-disable-next-line @angular-eslint/no-output-native -- cancel only applies to a handful of elements which this is not
  readonly cancel = output();
  @ViewChild('input', { read: ElementRef })
  inputField!: ElementRef<HTMLInputElement>;

  writeValue(obj: string): void {
    this.value = obj;
    this.onChange(obj);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngAfterViewInit(): void {
    this.inputField.nativeElement.focus();
  }

  keydownHandler(e: KeyboardEvent): void {
    e.stopPropagation();
  }
}

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
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
      useExisting: forwardRef(() => NodeEditorComponent),
      multi: true,
    },
  ],
})
export class NodeEditorComponent
  implements ControlValueAccessor, AfterViewInit
{
  value = '';
  disabled = false;
  onChange = (_: string): void => {
    /* */
  };

  onTouched = (): void => {
    /* */
  };

  @Input() placeholder = '';
  @Output() readonly save = new EventEmitter<string>();
  @Output() readonly cancel = new EventEmitter<void>();
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
}

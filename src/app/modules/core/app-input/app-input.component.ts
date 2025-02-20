import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input, OnChanges,
  Output, SimpleChanges, ViewChild,
} from '@angular/core';
import { AppInput, InputButton } from './input.model';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  standalone: false,
  styleUrls: ['./app-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppInputComponent implements OnChanges {

  // ===================================================================================
  //                  Attributes
  // ===================================================================================
  @Input() input: AppInput;
  @Output() inputValueChange = new EventEmitter<string>();

  // ===================================================================================
  //                  Internal
  // ===================================================================================
  @ViewChild('inputElement', {static: true}) inputElement!: ElementRef<HTMLInputElement>;

  // ===================================================================================
  //                  Lifecycle
  // ===================================================================================
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['input'] && !changes['input'].isFirstChange()) {
      // Update the input field value explicitly if the input value changes
      if (this.inputElement && this.input?.value !== undefined || this.input?.value !== null) {
        this.inputElement.nativeElement.value = this.input.value;
      }
    }
  }

  // ===================================================================================
  //                  Handle input changes
  // ===================================================================================
  public onInputChange(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.inputValueChange.emit(newValue);
  }

  // ===================================================================================
  //                     Handle button actions
  // ===================================================================================
  public handleButtonAction(button: InputButton): void {
    if (button.action) {
      button.action();
    }
  }
}

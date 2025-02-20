import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: false,
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  @Input() errorMessage: string;

  public clearError(): void {
    this.errorMessage = null;
  }

}

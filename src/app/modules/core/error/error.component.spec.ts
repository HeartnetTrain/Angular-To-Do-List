import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { By } from '@angular/platform-browser';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the error message when errorMessage is provided', () => {
    const errorMessage = 'Test error message';
    component.errorMessage = errorMessage;
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.app-error__container'));
    const errorText = errorElement.query(By.css('span')).nativeElement.textContent;

    expect(errorText).toBe(errorMessage);
  });

  it('should call clearError() and remove error message when close button is clicked', () => {
    const errorMessage = 'Test error message';
    component.errorMessage = errorMessage;
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('button'));
    closeButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.errorMessage).toBeNull();
    const errorElement = fixture.debugElement.query(By.css('.app-error__container'));
    expect(errorElement).toBeNull();
  });

  it('should not display the error message when errorMessage is null', () => {
    component.errorMessage = null;
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.app-error__container'));
    expect(errorElement).toBeNull();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppInputComponent } from './app-input.component';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { InputButton } from './input.model';
import { ChangeDetectorRef } from '@angular/core';

describe('AppInputComponent', () => {
  let component: AppInputComponent;
  let fixture: ComponentFixture<AppInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppInputComponent],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInputComponent);
    component = fixture.componentInstance;

    // Initialize the input property to avoid null/undefined issues
    component.input = {value: '', placeholder: '', maxLength: 100, buttons: []};
    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display input value and placeholder from @Input() input', () => {
    // Set the input property
    const testValue = 'Test Value';
    const testPlaceholder = 'Test Placeholder';
    component.input = {value: testValue, placeholder: testPlaceholder, maxLength: 100, buttons: []};

    // Trigger change detection
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();

    // Query the input element
    const inputElement = fixture.debugElement.query(By.css('.app-input__container > input')).nativeElement;

    // Assert the value and placeholder
    expect(inputElement.value).toBe(testValue);
    expect(inputElement.placeholder).toBe(testPlaceholder);
  });

  it('should emit the new value when input changes', () => {
    // Spy on the inputValueChange emitter
    spyOn(component.inputValueChange, 'emit');

    // Simulate user input
    const newValue = 'New Input Value';
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = newValue;
    inputElement.dispatchEvent(new Event('input'));

    // Trigger change detection
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();

    // Assert that the inputValueChange emitter was called with the correct value
    expect(component.inputValueChange.emit).toHaveBeenCalledWith(newValue);
  });

  it('should call the button action when clicked', () => {
    // Define a mock button with an action
    const mockButtonAction = jasmine.createSpy('buttonAction');
    const mockButton: InputButton = {buttonClass: 'mock-button-class', icon: 'add', action: mockButtonAction};

    // Set the input property with a button
    component.input = {value: '', placeholder: '', maxLength: 100, buttons: [mockButton]};

    // Trigger change detection to render the button
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();

    // Query the button element
    const buttonElement = fixture.debugElement.query(By.css('button'));

    // Ensure the button is rendered
    expect(buttonElement).not.toBeNull(); // Verify that the button exists

    // Trigger button click
    buttonElement.triggerEventHandler('click', null);

    // Assert that the button action was called
    expect(mockButtonAction).toHaveBeenCalled();
  });
});

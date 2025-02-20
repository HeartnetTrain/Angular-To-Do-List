import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { By } from '@angular/platform-browser';
import { Task } from '../../../store/tasks/models/task.model';
import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/** This file in particular deals with DOM elements verification to showcase the power
 * of TestBed in allowing DOM manipulation and UI tests */
describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  // Mocked task data
  const mockedTask: Task = {
    id: 1,
    name: 'Test Task',
    completed: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      imports: [TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = mockedTask;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display all buttons', () => {
    // Initially, task is not completed
    const buttons: DebugElement [] = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(4); // 4 buttons should be visible (drag, check, edit, delete)

    // Check the "drag" button is visible
    const dragButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('.app-task-item__title button');
    expect(dragButton.innerText).toBe('drag_indicator');

    // Initially, task is not completed
    // Verify the "check", "edit" and "delete" buttons are visible
    const actionButtons: HTMLButtonElement[] = fixture.debugElement.nativeElement.querySelectorAll('.app-task-item__actions > button');
    const [checkButton, editButton, deleteButton] = actionButtons;
    expect(checkButton.textContent).toBe('check');
    expect(editButton.textContent).toBe('edit');
    expect(deleteButton.textContent).toBe('delete');
  });

  it('should change button from check to refresh and the completed class to be defined on the task name element', () => {
    // Mark task as completed
    component.task = {...component.task, completed: true};
    // Trigger change detection mechanism that is used by the component
    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();

    // THEN
    const actionButtons: HTMLButtonElement[] = fixture.debugElement.nativeElement.querySelectorAll('.app-task-item__actions > button');
    const title = fixture.debugElement.nativeElement.querySelector('.app-task-item__title');
    expect(actionButtons[0].textContent).toBe('refresh')
    expect(title).toHaveClass('app-task-item__completed')
  })

  it('should call select() when the check button is clicked for an incomplete task', () => {
    spyOn(component, 'select');
    const checkButton: HTMLButtonElement = fixture.debugElement.query(By.css('.app-task-item__actions > button:nth-child(1)')).nativeElement;
    checkButton.click();
    expect(component.select).toHaveBeenCalled();
  });

  it('should call initUpdate() when the edit button is clicked', () => {
    spyOn(component, 'initUpdate');
    const editButton: HTMLButtonElement = fixture.debugElement.query(By.css('.app-task-item__actions > button:nth-child(2)')).nativeElement;
    editButton.click();
    expect(component.initUpdate).toHaveBeenCalled();
  });

  it('should call delete() when the delete button is clicked', () => {
    spyOn(component, 'delete');
    const deleteButton: HTMLButtonElement = fixture.debugElement.query(By.css('.app-task-item__actions > button:nth-child(3)')).nativeElement;
    deleteButton.click();
    expect(component.delete).toHaveBeenCalled();
  });

});

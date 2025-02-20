import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskScreenFormComponent } from './task-screen-form.component';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../store/tasks/models/task.model';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { EventEmitter, SimpleChange } from '@angular/core';
import { of } from 'rxjs';
import { AppInputModule } from '../../../core/app-input/app-input.module';

describe('TaskScreenFormComponent', () => {
  let component: TaskScreenFormComponent;
  let fixture: ComponentFixture<TaskScreenFormComponent>;

  beforeEach(async () => {
    // Mock TranslateService
    const translateService = jasmine.createSpyObj<TranslateService>('translateService', ['get']);
    const translateServiceMock = {
      currentLang: 'en',
      onLangChange: new EventEmitter<LangChangeEvent>(),
      use: translateService.get,
      get: translateService.get.and.returnValue(of('')),
      onTranslationChange: new EventEmitter(),
      onDefaultLangChange: new EventEmitter()
    };

    // Provide the mocked services
    await TestBed.configureTestingModule({
      declarations: [TaskScreenFormComponent],
      imports: [FormsModule, AppInputModule],
      providers: [
        {provide: TranslateService, useValue: translateServiceMock}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskScreenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize newTaskInput on init', () => {
    component.ngOnInit();
    expect(component.newTaskInput).toBeDefined();
    expect(component.newTaskInput.value).toBe('');
    expect(component.newTaskInput.placeholder).toBe('TODO.APP.TASKS_ADD');
  });

  it('should initialize updatedTaskInput when taskToUpdate changes', () => {
    const task: Task = {id: 1, name: 'Test Task', completed: false};
    component.taskToUpdate = task;

    const changes = {
      taskToUpdate: new SimpleChange(null, task, false)
    };

    component.ngOnChanges(changes);
    expect(component.updatedTaskInput).toBeDefined();
    expect(component.updatedTaskInput.value).toBe(task.name);
    expect(component.updatedTaskInput.placeholder).toBe('TODO.APP.TASKS_EDIT');
  });

  it('should emit addedTask with newTaskName when addTask is called', () => {
    spyOn(component.addedTask, 'emit');
    component.newTaskInput = {value: 'New Task', placeholder: '', maxLength: 50, buttons: []};
    component.addTask();
    expect(component.addedTask.emit).toHaveBeenCalledWith('New Task');
    expect(component.newTaskInput.value).toBe('');
  });

  it('should not emit addedTask if newTaskName is empty or whitespace', () => {
    spyOn(component.addedTask, 'emit');
    component.newTaskInput = {value: '  ', placeholder: '', maxLength: 50, buttons: []};
    component.addTask();
    expect(component.addedTask.emit).not.toHaveBeenCalled();
  });

  it('should emit savedTask with updatedTask when saveUpdatedTask is called', () => {
    const task: Task = {id: 1, name: 'Updated Task', completed: false};
    component.taskToUpdate = {id: 1, name: 'Old Task', completed: false};
    component.updatedTaskInput = {value: 'Updated Task', placeholder: '', maxLength: 50, buttons: []};
    spyOn(component.savedTask, 'emit');
    component.saveUpdatedTask();
    expect(component.savedTask.emit).toHaveBeenCalledWith(task);
  });

  it('should not emit savedTask if updatedTask name is empty or whitespace', () => {
    spyOn(component.savedTask, 'emit');
    component.updatedTaskInput = {value: '  ', placeholder: '', maxLength: 50, buttons: []};
    component.saveUpdatedTask();
    expect(component.savedTask.emit).not.toHaveBeenCalled();
  });

  it('should clear updatedTaskInput and emit canceledUpdate when cancelUpdate is called', () => {
    spyOn(component.canceledUpdate, 'emit');
    const task: Task = {id: 1, name: 'Test Task', completed: false};
    component.updatedTaskInput = {value: task.name, placeholder: '', maxLength: 50, buttons: []};
    component.cancelUpdate();
    expect(component.updatedTaskInput).toBeNull();
    expect(component.canceledUpdate.emit).toHaveBeenCalled();
  });

  it('should call initUpdatedTaskInput when taskToUpdate changes', () => {
    const task: Task = {id: 1, name: 'Updated Task', completed: false};
    component.taskToUpdate = task;

    const changes = {
      taskToUpdate: new SimpleChange(null, task, false)
    };

    component.ngOnChanges(changes);
    expect(component.updatedTaskInput).toBeDefined();
    expect(component.updatedTaskInput.value).toBe(task.name);
  });

  it('should reset task input when cancelUpdate is called', () => {
    spyOn(component.canceledUpdate, 'emit');
    const task: Task = {id: 1, name: 'Test Task', completed: false};
    component.updatedTaskInput = {value: task.name, placeholder: '', maxLength: 50, buttons: []};
    component.cancelUpdate();
    expect(component.updatedTaskInput).toBeNull();
  });

});

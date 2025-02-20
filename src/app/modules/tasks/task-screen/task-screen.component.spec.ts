import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskScreenComponent } from './task-screen.component';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TaskService } from '../task.service';
import { Task } from '../../../store/tasks/models/task.model';
import { FormsModule } from '@angular/forms';
import { TaskScreenModule } from './task-screen.module';
import { provideMockStore } from '@ngrx/store/testing';

describe('TaskScreenComponent', () => {
  let component: TaskScreenComponent;
  let fixture: ComponentFixture<TaskScreenComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  const mockedTasks: Task[] = [
    {id: 1, name: 'Task 1', completed: false},
    {id: 2, name: 'Task 2', completed: true}
  ];

  const mockedState = {tasks: mockedTasks};

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', ['addTask', 'saveUpdatedTask', 'deleteTask', 'toggleTaskCompletion', 'filterTasksByName', 'reorderTasks']);

    await TestBed.configureTestingModule({
      declarations: [TaskScreenComponent],
      imports: [FormsModule, StoreModule.forRoot({}), TranslateModule.forRoot(), TaskScreenModule],
      providers: [
        {provide: TaskService, useValue: taskService},
        provideMockStore({initialState: mockedState}),
        TranslateService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    taskService.filterTasksByName.and.returnValue(mockedTasks);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tasks and search input on ngOnInit', () => {
    component.ngOnInit();
    expect(component.tasks).toBeDefined();
    expect(component.filteredTasks).toBeDefined();
    expect(component.searchInput.placeholder).toBe('TODO.APP.TASKS_SEARCH');
  });

  it('should add a task', () => {
    component.addTask('New Task');
    expect(taskService.addTask).toHaveBeenCalledWith('New Task');
  });

  it('should initialize task to update', () => {
    component.tasks = mockedTasks;
    component.initTaskToUpdate(1);
    expect(component.taskToUpdate).toEqual(mockedTasks[0]);
  });

  it('should save an updated task', () => {
    const updatedTask: Task = {id: 1, name: 'Updated Task', completed: false};
    component.saveUpdatedTask(updatedTask);
    expect(taskService.saveUpdatedTask).toHaveBeenCalledWith(updatedTask);
    expect(component.taskToUpdate).toBeNull();
  });

  it('should cancel task update', () => {
    component.taskToUpdate = mockedTasks[0];
    component.cancelUpdate();
    expect(component.taskToUpdate).toBeNull();
  });

  it('should delete a task', () => {
    component.deleteTask(1);
    expect(taskService.deleteTask).toHaveBeenCalledWith(1);
  });

  it('should toggle task completion', () => {
    component.selectTask(1);
    expect(taskService.toggleTaskCompletion).toHaveBeenCalledWith(1);
  });

  it('should reorder tasks', () => {
    component.reorderTasks(mockedTasks);
    expect(taskService.reorderTasks).toHaveBeenCalledWith(mockedTasks);
  });

  it('should filter tasks by search term', () => {
    component.tasks = mockedTasks;
    component.onSearchTermChange('Task');
    expect(component.filteredTasks).toEqual(mockedTasks);
    expect(taskService.filterTasksByName).toHaveBeenCalledWith(mockedTasks, 'Task');
  });

  it('should set error message if task loading fails', () => {
    spyOn(console, 'error');
    component.errorMessage = 'TODO.APP.TASKS_LOAD_ERROR_MESSAGE';
    expect(component.errorMessage).toBe('TODO.APP.TASKS_LOAD_ERROR_MESSAGE');
  });
});

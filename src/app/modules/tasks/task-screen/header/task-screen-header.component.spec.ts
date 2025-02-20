import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskScreenHeaderComponent } from './task-screen-header.component';
import { TaskService } from '../../task.service';
import { TranslateModule } from '@ngx-translate/core';

describe('TaskScreenHeaderComponent', () => {
  let component: TaskScreenHeaderComponent;
  let fixture: ComponentFixture<TaskScreenHeaderComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    // Create spy objects for TaskService and TranslateService
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['deleteAllTasks', 'loadSampleTasks']);

    // Configure the test module with necessary imports and providers
    await TestBed.configureTestingModule({
      declarations: [TaskScreenHeaderComponent],
      imports: [TranslateModule.forRoot()], // Import TranslateModule
      providers: [
        {provide: TaskService, useValue: taskServiceSpy}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component and trigger change detection
    fixture = TestBed.createComponent(TaskScreenHeaderComponent);
    component = fixture.componentInstance;

    // Trigger initial change detection
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call taskService.deleteAllTasks when deleteAllTasks is called', () => {
    component.deleteAllTasks();
    expect(taskServiceSpy.deleteAllTasks).toHaveBeenCalled(); // Ensure deleteAllTasks was called
  });

  it('should call taskService.loadSampleTasks when loadSampleTasks is called', () => {
    component.loadSampleTasks();
    expect(taskServiceSpy.loadSampleTasks).toHaveBeenCalledWith(component.numberOfTasks); // Ensure loadSampleTasks was called with the correct argument
  });
});

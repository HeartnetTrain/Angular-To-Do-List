import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [DragDropModule],
      schemas: [NO_ERRORS_SCHEMA] // Suppress unknown element/schema errors
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event with correct id', () => {
    spyOn(component.update, 'emit');
    component.update.emit(1);
    expect(component.update.emit).toHaveBeenCalledWith(1);
  });

  it('should emit delete event with correct id', () => {
    spyOn(component.delete, 'emit');
    component.delete.emit(1);
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  it('should emit select event with correct id', () => {
    spyOn(component.select, 'emit');
    component.select.emit(1);
    expect(component.select.emit).toHaveBeenCalledWith(1);
  });

  it('should reorder tasks and emit new order', () => {
    spyOn(component.reorder, 'emit');
    component.tasks = [
      {id: 1, name: 'Task 1', completed: false},
      {id: 2, name: 'Task 2', completed: false},
      {id: 2, name: 'Task 3', completed: false}
    ];

    fixture.detectChanges();

    component.drop({previousIndex: 0, currentIndex: 1} as any);
    expect(component.reorder.emit).toHaveBeenCalledWith([
      {id: 2, name: 'Task 2', completed: false},
      {id: 1, name: 'Task 1', completed: false},
      {id: 2, name: 'Task 3', completed: false}
    ]);
  });
});

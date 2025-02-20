import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['addLangs', 'getDefaultLang', 'getBrowserLang', 'setDefaultLang', 'use']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule],
      providers: [
        {provide: TranslateService, useValue: translateServiceSpy}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should add supported languages on init', () => {
    translateServiceSpy.getBrowserLang.and.returnValue('en');
    translateServiceSpy.getDefaultLang.and.returnValue('en'); // Ensure default language is correctly returned

    component.ngOnInit();

    expect(translateServiceSpy.addLangs).toHaveBeenCalledWith(['en', 'fr']);
    expect(translateServiceSpy.setDefaultLang).toHaveBeenCalledWith('en');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
  });

  it('should fallback to English if browser language is not supported', () => {
    translateServiceSpy.getBrowserLang.and.returnValue('es'); // Unsupported language
    translateServiceSpy.getDefaultLang.and.returnValue('en'); // Ensure fallback returns 'en'

    component.ngOnInit();

    expect(translateServiceSpy.setDefaultLang).toHaveBeenCalledWith('en');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
  });

  it('should fallback to English if getBrowserLang returns undefined', () => {
    translateServiceSpy.getBrowserLang.and.returnValue(undefined); // No browser language
    translateServiceSpy.getDefaultLang.and.returnValue('en'); // Ensure fallback returns 'en'

    component.ngOnInit();

    expect(translateServiceSpy.setDefaultLang).toHaveBeenCalledWith('en');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
  });
});

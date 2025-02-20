import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateLoader } from '@ngx-translate/core';

/** A custom translation loader to define the translation resources to use in the application
 * by the Translate Module
 * */
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {
  }

  public getTranslation(lang: string): Observable<any> {
    const filePath = `/assets/i18n/TO-DO-APP_Resources_${lang}.json`;
    return this.http.get(filePath).pipe(
      catchError((error) => {
        console.error(`Error loading translation file: ${filePath}`, error);
        return of({});
      })
    );
  }
}

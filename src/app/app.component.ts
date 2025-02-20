import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    // Add supported languages
    this.translate.addLangs(['en', 'fr']);

    // Set the default language
    const browserLang = this.translate.getBrowserLang() || 'en';
    this.translate.setDefaultLang(browserLang.match(/en|fr/) ? browserLang : 'en');

    // Use the default language or fallback to 'en'
    this.translate.use(this.translate.getDefaultLang());
  }

}

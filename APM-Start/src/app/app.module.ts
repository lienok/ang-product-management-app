import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeSk from '@angular/common/locales/sk';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    ProductModule
  ],
  bootstrap: [AppComponent],

  providers: [
    { provide: LOCALE_ID, useValue: 'sk' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }]
})
export class AppModule { }

registerLocaleData(localeSk, 'sk');

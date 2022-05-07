import { registerLocaleData } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import localeSk from '@angular/common/locales/sk';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { StarComponent } from './shared/star.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';


@NgModule({
  declarations: [
    AppComponent, 
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  bootstrap: [AppComponent],

  providers: [
    {provide: LOCALE_ID, useValue: 'sk' }, 
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'}]
})
export class AppModule { }

registerLocaleData(localeSk, 'sk');

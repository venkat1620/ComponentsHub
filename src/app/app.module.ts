import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LightBarComponent } from './light-bar/light-bar.component';
import { LightBarUpdatedComponent } from './light-bar-updated/light-bar-updated.component';
import { NumpadComponent } from './numpad/numpad.component';
import { NumpadBtnComponent } from './numpad/numpad-btn.component';
import { CustomInputDirective } from './numpad/custom-input.directive';
import { ToggleComponentDirective } from './numpad/toggle-component.directive';

@NgModule({
  declarations: [
    AppComponent,
    LightBarComponent,
    LightBarUpdatedComponent,
    NumpadComponent,
    NumpadBtnComponent,
    CustomInputDirective,
    ToggleComponentDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

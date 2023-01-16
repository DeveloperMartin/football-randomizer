import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {CardModule} from 'primeng/card';
import {TreeModule} from 'primeng/tree';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {KnobModule} from 'primeng/knob';
import {OrganizationChartModule} from 'primeng/organizationchart';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CardModule,
    TreeModule,
    ButtonModule,
    ReactiveFormsModule,
    InputMaskModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    KnobModule,
    OrganizationChartModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

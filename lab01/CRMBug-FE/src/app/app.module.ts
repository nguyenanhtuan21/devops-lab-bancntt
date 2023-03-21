import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedComponentModule } from './components/shared-component.module';
import { AddIssueComponent } from './components/add-issue/add-issue.component';
import { ProjectComponent } from './components/project/project.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatMenuModule} from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HighchartsChartModule } from "highcharts-angular";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  bootstrapPlugin
])

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageHeaderComponent,
    HomeComponent,
    CustomerComponent,
    ProjectComponent,
    SidebarComponent,
    AddIssueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedComponentModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    HttpClientModule,
    MatMenuModule,
    NgxSliderModule,
    HighchartsChartModule,
    QRCodeModule,
    NgxDaterangepickerMd.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-center'
    }), // ToastrModule added
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

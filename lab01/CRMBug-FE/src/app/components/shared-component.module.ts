import { PieChartComponent } from './../base/pie-chart/pie-chart.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MonthlyCalendarComponent } from './../base/calendar/monthly-calendar/monthly-calendar.component';
import { WeeklyCalendarComponent } from './../base/calendar/weekly-calendar/weekly-calendar.component';
import { CalendarComponent } from './../base/calendar/calendar.component';
import { BaseDatetimepickerComponent } from './../base/base-datetimepicker/base-datetimepicker.component';
import { BaseNotificationComponent } from '../base/base-notification/base-notification.component';
import { BaseComboboxComponent } from './../base/base-combobox/base-combobox.component';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BaseButtonComponent } from "../base/base-button/base-button.component";
import { BaseTextboxComponent } from "../base/base-textbox/base-textbox.component";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PopupEditIssueComponent } from './popup/popup-edit-issue/popup-edit-issue.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PopupAddProjectComponent } from './popup/popup-add-project/popup-add-project.component';
import { AuthComponent } from './auth/auth.component';
import { PopupUpdateUserSettingComponent } from './popup/popup-update-user-setting/popup-update-user-setting.component';
import { RegisterComponent } from './register/register.component';
import {MatInputModule} from '@angular/material/input';
import { LoadingComponent } from '../base/loading/loading.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { PopupInviteMemberComponent } from './popup/popup-invite-member/popup-invite-member.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ViewTaskComponent } from './view-task/view-task.component';
import { PopupAddTaskComponent } from './popup/popup-add-task/popup-add-task.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { HighchartsChartModule } from "highcharts-angular";
import { PopupConfirmComponent } from './popup/popup-confirm/popup-confirm.component';
import { MatMenuModule } from '@angular/material/menu';
// import { DaterangeComponent } from '../base/daterange/daterange.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { RecentlyViewedComponent } from './recently-viewed/recently-viewed.component';
import { NoDataComponent } from '../base/no-data/no-data.component';
import { BaseProjectComponent } from '../base/base-project/base-project.component';
import { PopupListProjectComponent } from './popup/popup-list-project/popup-list-project.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PopupContactComponent } from './popup/popup-contact/popup-contact.component';
import { ReportComponent } from './report/report.component';
import { ProgrerssReportComponent } from './progrerss-report/progrerss-report.component';
import { AssignedReportComponent } from './assigned-report/assigned-report.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
	declarations: [
		BaseButtonComponent,
		BaseTextboxComponent,
		BaseComboboxComponent,
		BaseNotificationComponent,
  	PopupEditIssueComponent,
   	PopupAddProjectComponent,
   	AuthComponent,
    PopupUpdateUserSettingComponent,
    RegisterComponent,
		LoadingComponent,
  	ProjectSettingsComponent,
		BaseDatetimepickerComponent,
  	PopupInviteMemberComponent,
		CalendarComponent,
		WeeklyCalendarComponent,
		MonthlyCalendarComponent,
		ViewTaskComponent,
		PopupAddTaskComponent,
		GanttChartComponent,
		PopupConfirmComponent,
		// DaterangeComponent,
  	RecentlyViewedComponent,
		NoDataComponent,
		BaseProjectComponent,
  	PopupListProjectComponent,
		PieChartComponent,
  	PopupContactComponent,
   ReportComponent,
   ProgrerssReportComponent,
   AssignedReportComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		MatSelectModule,
		MatFormFieldModule,
		MatTooltipModule,
		MatDialogModule,
		MatInputModule,
		MatTabsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatDatepickerModule,
		NgxMatTimepickerModule,
		ReactiveFormsModule,
		MatButtonModule,
		NgxMatDatetimePickerModule,
		MatNativeDateModule,
		NgxMatMomentModule,
		FullCalendarModule,
		NgxSliderModule,
		PerfectScrollbarModule,
		HighchartsChartModule,
		MatMenuModule,
		QRCodeModule,
		NgxDaterangepickerMd.forRoot()
	],
	exports: [
		BaseButtonComponent,
		BaseTextboxComponent,
		BaseComboboxComponent,
		BaseNotificationComponent,
		BaseDatetimepickerComponent,
		LoadingComponent,
		AppRoutingModule,
		CalendarComponent,
		WeeklyCalendarComponent,
		MonthlyCalendarComponent,
		// DaterangeComponent,
		NoDataComponent,
		BaseProjectComponent,
		PieChartComponent
	],
	providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedComponentModule { }
import { AssignedReportComponent } from './../assigned-report/assigned-report.component';
import { ProgrerssReportComponent } from './../progrerss-report/progrerss-report.component';
import { GanttChartComponent } from './../gantt-chart/gantt-chart.component';
import { ViewTaskComponent } from './../view-task/view-task.component';
import { ProjectSettingsComponent } from './../project-settings/project-settings.component';
import { AddIssueComponent } from './../add-issue/add-issue.component';
import { HomeComponent } from './../home/home.component';
import { ProjectComponent } from './project.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ReportComponent } from '../report/report.component';

const routes: Routes = [
  {
    path: "",
    component: ProjectComponent,
    children: [
      {
        path: "home/:projectID",
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "add-issue/:projectID",
        component: AddIssueComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "view-task/:projectID",
        component: ViewTaskComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "gantt-chart/:projectID",
        component: GanttChartComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "assigned-report/:projectID",
        component: AssignedReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "report/:projectID",
        component: ReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "progress-report/:projectID",
        component: ProgrerssReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "settings/:projectID",
        component: ProjectSettingsComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }

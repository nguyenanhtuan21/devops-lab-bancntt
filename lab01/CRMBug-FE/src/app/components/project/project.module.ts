import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }

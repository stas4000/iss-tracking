import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { RouterModule } from "@angular/router";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";



@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ReportComponent }]),
    NgxDatatableModule
  ]
})
export class ReportModule { }

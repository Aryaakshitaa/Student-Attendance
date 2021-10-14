import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AttendanceService } from '../attendance.service';
import { attendance, attendanceRec } from '../model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  view: [number, number] = [700, 300];
  rec: Array<attendanceRec> = [];
  mainData: Array<attendance> = [];
  arr: Array<attendanceRec> = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  showYAxisLabel = true;
  yAxisLabel = 'Present Students';

  constructor(private attend: AttendanceService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.attend.getAll().subscribe((data) => {
      data.sort()
      data.forEach((d) => {
        let count = 0;
        d.present.forEach((temp2) => {
          count++;
        })
        this.arr.push({ "name": d.date, "value": count })
      })
    })
    this.rec = this.arr;
    console.log(this.rec);
  }
}

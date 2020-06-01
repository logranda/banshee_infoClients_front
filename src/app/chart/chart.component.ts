import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {CityService} from '../services/city.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true
  };

  barChartLabels: Label[] = this.getChartLabels();
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [{ data: this.getDataChart(), label: 'Number of visits by city' }];
  barChartPlugins = [];

  constructor(private cityService: CityService, private location: Location) {
  }

  ngOnInit() {
    this.getDataChart();
  }

  private getDataChart(): any[] {
    const barChartDataLocal = [];
    this.cityService.getVisitByCity().subscribe(response => {
      response.response.visitNumber.forEach(visitNumber => barChartDataLocal.push(visitNumber));
    });
    return barChartDataLocal;
  }

  private getChartLabels(): any[] {
    const barChartLabelsLocal = [];
    this.cityService.getVisitByCity().subscribe(response => {
      response.response.city.forEach(city => barChartLabelsLocal.push(city.name));
    });
    return barChartLabelsLocal;
  }

  cancel() {
    this.location.back();
  }

}

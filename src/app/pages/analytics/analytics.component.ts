import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { DataServiceService } from 'src/app/shared/data-service.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  barChartOptions = {
    responsive: true,
  };
  barChartLabels = ['Users', 'Transactions', 'Cars'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData!: ChartData<'bar'>;
  barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(249,152,32,1)',
    },
    {
      backgroundColor: 'rgba(89,103,128,1)',
    },
    {
      backgroundColor: 'rgba(32,129,249,1)',
    }
  ];
  loading = true;

  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.dataService.getUsersCount().subscribe(userCount => {
      this.dataService.getTransactionsCount().subscribe(transactionCount => {
        this.dataService.getCarsCount().subscribe(carCount => {
          this.barChartData = {
            labels: this.barChartLabels,
            datasets: [
              {
                data: [userCount, transactionCount, carCount],
                label: 'Counts',
                backgroundColor: this.barChartColors.map(color => color.backgroundColor)
              }
            ]
          };
          this.loading = false;
        });
      });
    });
  }
}

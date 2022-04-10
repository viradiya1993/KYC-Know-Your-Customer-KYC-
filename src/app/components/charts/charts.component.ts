import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  series = [
    {
      "name": "Debit",
      "value": 41.4,
      "label": "41.4%"
    },
    {
      "name": "Top-up",
      "value": 49.2,
      "label": "49.2%"
    },
  ];

  pieChartLabel(series: any[], name: string): string {
    const item = series.filter(data => data.name === name);
    if (item.length > 0) {
      return item[0].label;
    }
    return name;
  }
}



import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../services/covid19-service';

@Component({
  selector: 'app-total-stats',
  templateUrl: './total-stats.component.html',
  styleUrls: ['./total-stats.component.scss']
})
export class TotalStatsComponent implements OnInit {

  constructor(private covidService:Covid19Service) { }
  totalStatConfig;
  totalCasesConfig;
  activeCasesConfig;
  deathCasesConfig;
  loaded:boolean;
  ngOnInit(): void {
    this.loaded=false;
    this.covidService.getData().subscribe(x=>{
      this.totalStatConfig = this.covidService.getTotalStatConfig(x);
      this.totalCasesConfig = this.covidService.getTotalCasesConfig(x);
      this.activeCasesConfig = this.covidService.getActiveCasesConfig(x);
      this.deathCasesConfig = this.covidService.getDeathCasesConfig(x);
      this.loaded = true;
    });
  }

}

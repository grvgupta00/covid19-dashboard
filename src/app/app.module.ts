import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HighchartsChartModule} from 'highcharts-angular';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { BodyComponent } from './center/center/body.component';
import { TotalStatsComponent } from './center/center/total-stats/total-stats.component';
import { ChartComponent } from './center/center/shared/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    TotalStatsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

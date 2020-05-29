import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
var AWS = require('aws-sdk');

@Injectable({
    providedIn:"root"
})
export class Covid19Service{

    getS3Bucket(): any{
        const bucket = new AWS.S3(
            {
              accessKeyId: 'access key id',
              secretAccessKey: 'secret acces key',
              region: 'AWS region'
            });
        return bucket;
    }

    getData():Observable<JSON>{
        const param = {
            Bucket:'covid10-data',
            Key:'covid19-data.json'
        }
        let result = new Subject<JSON>();
        this.getS3Bucket().getObject(param,function(err,data){
            if (err) {
                console.log('There was an error uploading your file: ', err);
                result.error(err);
              }
              console.log('Successfully retrieved file.');
              result.next(JSON.parse(data.Body));
        });
        return result.asObservable();
    }
    
    getActiveCasesConfig(fileData): any {
        let res = (fileData as any)[0];
        return {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Active cases Trend'
            },
            xAxis: {
                categories: res.dates.reverse()
            },
            yAxis: {
                title: {
                    text: 'Active Cases'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name:'Active cases',
                data: res.active.reverse(),
                color:'lightblue'
            }]
        }
    }
    getDeathCasesConfig(fileData): any {
        let res = (fileData as any)[0];
        return {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Recovered vs Deaths Trend'
            },
            xAxis: {
                categories: res.dates.reverse()
            },
            yAxis: {
                title: {
                    text: 'Total Cases'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name:'Death',
                data: res.death.reverse(),
                color:'black'
            },{
                name:'Recovered',
                data:res.recovered.reverse(),
                color:'lightgreen'
            }]
        }
    }
    getTotalCasesConfig(fileData): any {
        let res = (fileData as any)[0];
        return {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Total cases Trend'
            },
            xAxis: {
                categories: res.dates.reverse()
            },
            yAxis: {
                title: {
                    text: 'Total Cases'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name:'Total cases',
                data: res.total.reverse(),
                color: 'teal'
            }]
        }
    }

    public getTotalStatConfig(fileData){
        let stats = (fileData as any)[0].stats;
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            tooltip:{
                pointFormat: '<b>{point.y}</b>',
                style:'background-color:black; fill:black;'
            },
            title: {
                text: stats.cases.total,
                align: 'center',
                verticalAlign: 'middle',
                y: 60
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format:'<b>{point.y}</b>',
                        style:{
                            color:'white'
                        }
                    },
                    showInLegend: true,
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%'],
                    size: '100%'
                }
            },
            series: [{
                type: 'pie',
                innerSize: '70%',
                data: [
                    {
                        name:'Active',
                        y:stats.cases.active,
                        color:'lightblue'
                    },
                    {
                        name:'Recovered',
                        y: stats.cases.recovered,
                        color:'lightgreen'
                    },
                    {
                        name:'Deaths',
                        y: stats.deaths.total,
                        color:'black'
                    }
                ]
            }]
        }
    }
}
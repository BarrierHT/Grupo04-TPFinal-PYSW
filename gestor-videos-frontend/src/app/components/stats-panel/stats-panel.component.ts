import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { GroupApiService } from 'src/app/services/group-api.service';
import { VideoApiService } from 'src/app/services/video-api.service';

@Component({
  selector: 'app-stats-panel',
  templateUrl: './stats-panel.component.html',
  styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements OnInit {

  stats1!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
  };
  stats2!: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
  };
  stats3!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
  };
  stats4!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
  };



  constructor(private videoService: VideoApiService, private groupService: GroupApiService) { }

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    this.videoService.getVideos('').subscribe(
      (result: any) => {
        const ownerMap = new Map<string, number>(); // nombre y numero de videos
        const ownerMap2 = new Map<string, number>(); // pais y numero de videos
        const videosByDate: any = {};

        const totalVideos = result.videos.length;
        const videosWithGroup = result.videos.filter((video: any) => video.groupId);
        const videosWithoutGroup = result.videos.filter((video: any) => !video.groupId);
        const percentWithGroup = (videosWithGroup.length / totalVideos) * 100;
        const percentWithoutGroup = (videosWithoutGroup.length / totalVideos) * 100;

        result.videos.forEach((video: any) => {

          if (video.owner && video.owner.name) {
            const ownerName = video.owner.name;

            if (ownerMap.has(ownerName)) {
              ownerMap.set(ownerName, (ownerMap.get(ownerName) as number) + 1);
            } else {
              ownerMap.set(ownerName, 1);
            }
          }

          // LOGICA DE VIDEOS POR PAIS
          if (video.owner && video.owner.country && video.owner.country.name) {
            const countryName = video.owner.country.name;

            if (ownerMap2.has(countryName)) {
              ownerMap2.set(countryName, (ownerMap2.get(countryName) as number) + 1);
            } else {
              ownerMap2.set(countryName, 1);
            }
          }

          // LOGICA VIDEOS POR FECHA
          if (video.createdAt) {
            const createdAt = video.createdAt.split('T')[0];
            if (videosByDate[createdAt]) {
              videosByDate[createdAt]++;
            } else {
              videosByDate[createdAt] = 1;
            }
          }

        });

        let charData: any[] = Array.from(ownerMap.entries()).map(([owner, count]) => ({
          x: owner,
          y: count,
        }));

        // LOGICA DE VIDEOS POR PAIS
        let charData2: any[] = Array.from(ownerMap2.entries()).map(([country, count]) => ({
          x: country,
          y: count,
        }));

        // LOGICA DE VIDEOS POR FECHA
        let charData3: any[] = Object.entries(videosByDate).map(([date, count]) => ({
          x: new Date(date).getTime(),
          y: count,
        }));
        charData3.sort((a, b) => a.x - b.x);


        console.log(charData);
        console.log("LOGICA STATS4");
        console.log(charData2);
        console.log("LOGICA STATS3");
        console.log(charData3);

        this.stats1 = {
          series: [
            {
              data: charData,
            },
          ],
          chart: {
            type: 'bar',
            height: 300,
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          }
        };

        this.stats2 = {
          series: [percentWithGroup, percentWithoutGroup],
          chart: {
            height: 320,
            type: "pie",
          },
          labels: ['Con Grupo', 'Sin Grupo'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };

        this.stats3 = {
          chart: {
            type: 'line',
            height: 300,
          },
          series: [{
            name: 'Cantidad de Videos',
            data: charData3,
          }],
          xaxis: {
            type: 'datetime',
            labels: {
              format: 'dd/MM/yyyy',
            },
          },
          yaxis: {
            title: {
              text: 'Cantidad de Videos',
            },
            labels: {
              formatter: function (value: number) {
                return Math.floor(value).toString();
              }
            }
          },
        };

        this.stats4 = {
          chart: {
            type: 'bar',
            height: 300,
          },
          series: [{
            name: 'Cantidad de Videos',
            data: charData2,
          }],
          xaxis: {
            categories: charData2.map(data => data.x),
            labels: {
              show: true,
            },
          },
          yaxis: {
            title: {
              text: 'Cantidad de Videos',
            },
            labels: {
              formatter: function (value: number) {
                return Math.floor(value).toString();
              }
            }
          }
        };
      },
      error => {
        console.log(error);
      }
    )
  }

}
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
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
  };
  stats2!: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
  };

  constructor(private videoService: VideoApiService, private groupService: GroupApiService) { }

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    this.videoService.getVideos('').subscribe(
      (result: any) => {
        const ownerMap = new Map<string, number>();
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
        });

        let charData: any[] = Array.from(ownerMap.entries()).map(([owner, count]) => ({
          x: owner,
          y: count,
        }));

        console.log(charData);

        this.stats1 = {
          series: [
            {
              data: charData,
            },
          ],
          chart: {
            type: 'bar',
            height: 400,
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          xaxis: {
            type: 'category',
          },
          yaxis: {
            title: {
              text: 'Number of Videos',
            }
          }
        };

        this.stats2 = {
          series: [percentWithGroup, percentWithoutGroup],
          chart: {
            width: 380,
            type: "pie"
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

      },
      error => {
        console.log(error);
      }
    )
  }

}
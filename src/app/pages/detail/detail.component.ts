import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Subscription } from 'rxjs';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public subscription!: Subscription;

  public countryData: {
    id: number, 
    country: string, 
    participations: {
      athleteCount: number
      city: string
      id: number
      medalsCount: number
      year: number
    }[]
  }[] = [];

  public countryName: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;

  // Data for the line chart
  public seriesData: {name: string, value: number}[] = [];
  public chartData: {
    name: string, 
    series: {
      name: string, 
      value: number
    }[]
  }[] = []; 

  public multi: { 
    name: string; 
    series: {
      name: string, 
      value: number
    }[]
  }[] = [];  

  // Options for the line chart
  public legend: boolean = true;
  public showLabels: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'Dates';
  public timeline: boolean = true;

  public view: [number, number] = [700, 300];

  public colorScheme: Color = {
    domain: ['#793D52', '#89A1DA', '#9680A1', '#BEE0F1', '#B8CAE6', '#945F65'],
    name: 'ordinal',
    selectable: true,
    group: ScaleType.Ordinal,
  };

  constructor(
    private olympicService: OlympicService, 
    private route: ActivatedRoute, 
    private location: Location,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();

    // Get the country name from the URL
    const countryName = this.route.snapshot.paramMap.get('countryName');

    this.subscription = this.olympicService.getOlympics().subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          console.log('Données récupérées avec succès : ', data);
    
          // Filter the data based on the country name
          this.countryData = data.filter(
            (country) => country.country.toLowerCase() === countryName?.toLowerCase()
          );

          // Get the country name and the data for the line chart
          this.countryName = this.countryData[0].country;

          // Calculate the total number of entries for the current country
          this.totalEntries = this.countryData[0].participations.length;

          // Calculate total medals and total athletes for the current country
          this.totalMedals = this.countryData[0].participations.reduce(
            (acc, cur) => acc + cur.medalsCount, 0
          );
          this.totalAthletes = this.countryData[0].participations.reduce(
            (acc, cur) => acc + cur.athleteCount, 0
          );

          // Calculate the data for the line chart
          for (let participation of this.countryData[0].participations) {
            this.seriesData.push({
              "name": participation.year.toString(), 
              "value": participation.medalsCount
            });
          }

          // Push the country data to the chartData array
          this.chartData.push({
            "name": this.countryName, 
            "series": this.seriesData
          });

          // Update the chart data with the calculated values
          this.multi = [...this.chartData];
          
          this.loaderService.hide();
        } else {
          console.log('Pas de données de participation pour le pays.');
          this.location.replaceState('/not-found');
          window.location.reload();
        }
      },
      error: (err) => {
        console.log('Impossible de récupérer les données : ', err);
        this.loaderService.hide();
      },
    });  
  }
    
  goBack(): void {
    this.location.back();
  }
}
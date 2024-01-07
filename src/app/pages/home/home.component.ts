import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  public olympic!: Olympic[];
  public subscription!: Subscription;
  
  public faMedal: IconDefinition = faMedal;

  public totalCountries: number = 0;
  public totalMedals: number = 0;
  public totalJOs: number = 0;

  public chartData: {name: string, value: number}[] = [];

  public single: {name: string, value: number}[] = [];

  public view: [number, number] = [700, 400];
  public gradient = false;
  public labels = true;

  public colorScheme: Color = {
    domain: ['#793D52', '#89A1DA', '#9680A1', '#BEE0F1', '#B8CAE6', '#945F65'],
    name: 'ordinal',
    selectable: true,
    group: ScaleType.Ordinal,
  };

  constructor(
    private olympicService: OlympicService,
    private router: Router ,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();

    this.subscription = this.olympicService.getOlympics().subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          console.log('Données récupérées avec succès : ', data);

          // Calculate total countries
          this.totalCountries = data.length;
          
          // Calculate total JOs
          let totalJOs = new Set();
          data.forEach((country) => {
            country.participations.forEach((participation: any) => {
              totalJOs.add(participation.year);
            })
          })
          this.totalJOs = totalJOs.size;

          // Calculate total medals for each country
          data.forEach((country) => {
            let totalMedals = 0;
            country.participations.forEach((participation: any) => {
              totalMedals += participation.medalsCount;
            })
            this.totalMedals += totalMedals;

            // Push the country data to the chartData array
            this.chartData.push({
              name: country.country,
              value: totalMedals,
            });
          });

          // Update the chart data with the calculated values
          this.single = [...this.chartData];
          console.log(this.single);

          this.loaderService.hide();
        } else {
          console.error('Les données récupérées sont invalides : ', data);
          this.loaderService.hide();
        }
      },
      error: (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des données : ', error);
        this.loaderService.hide();
      }
    });
  }
  
  // Handle the click on a country, redirect to the country page
  public onSelect(event: {name: string, value: number}): void {
    this.router.navigate(['/country', event.name]);
  }

  // Destroy the subscription to prevent memory leaks
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
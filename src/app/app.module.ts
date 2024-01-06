import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts'; // Import the chart library
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // add the icon library
import { DetailComponent } from './pages/detail/detail.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    DetailComponent,
    NotFoundComponent,
    CardComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    AppRoutingModule, 
    HttpClientModule, 
    NgxChartsModule, // Add the chart library
    FontAwesomeModule // Add the FontAwesomeModule for the icons
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

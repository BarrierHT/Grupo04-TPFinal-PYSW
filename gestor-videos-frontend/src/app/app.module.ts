import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChannelComponent } from './components/channel/channel.component';
import { ListVideoComponent } from './components/list-video/list-video.component';
import { ShowVideoComponent } from './components/show-video/show-video.component';
import { FormVideoComponent } from './components/form-video/form-video.component';

import { AbbreviateNumberPipe } from './pipes/abbreviate-number.pipe';
import { GroupComponent } from './components/group/group.component';
import { ReportComponent } from './components/report/report.component';
import { ExploreGroupsComponent } from './components/explore-groups/explore-groups.component';
import { DataTablesModule } from 'angular-datatables';
import { VideosComponent } from './components/videos/videos.component';
import { StatsPanelComponent } from './components/stats-panel/stats-panel.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,

    LoginComponent,
    SignupComponent,
    ChannelComponent,
    ListVideoComponent,
    ShowVideoComponent,
    FormVideoComponent,

    AbbreviateNumberPipe,
    GroupComponent,
    ReportComponent,
    ExploreGroupsComponent,
    VideosComponent,
    StatsPanelComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

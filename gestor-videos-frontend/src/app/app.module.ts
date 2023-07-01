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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

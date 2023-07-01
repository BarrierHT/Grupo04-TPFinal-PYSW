import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { ListVideoComponent } from './components/list-video/list-video.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ShowVideoComponent } from './components/show-video/show-video.component';
import { FormVideoComponent } from './components/form-video/form-video.component';
import { ChannelComponent } from './components/channel/channel.component';
import { GroupComponent } from './components/group/group.component';
import { ReportComponent } from './components/report/report.component';
import { ExploreGroupsComponent } from './components/explore-groups/explore-groups.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'playlist', component: ListVideoComponent },
  { path: 'watch/:videoId', component: ShowVideoComponent },
  { path: 'form-video', component: FormVideoComponent },
  { path: 'channel', component: ChannelComponent },
  { path: 'groups', component: GroupComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'explore-groups', component: ExploreGroupsComponent },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

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
import { VideosComponent } from './components/videos/videos.component';
import { StatsPanelComponent } from './components/stats-panel/stats-panel.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthRoleGuard } from './guards/auth-role.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'playlist', component: ListVideoComponent, canActivate: [AuthGuard] },
  { path: 'watch/:videoId', component: ShowVideoComponent },
  {
    path: 'watch/:videoId/playlist/:playlistId',
    component: ShowVideoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'form-video/:videoId',
    component: FormVideoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'channel', component: ChannelComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportComponent, canActivate: [AuthRoleGuard] },
  {
    path: 'explore-groups',
    component: ExploreGroupsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'videos', component: VideosComponent, canActivate: [AuthRoleGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthRoleGuard] },
  {
    path: 'stats-panel',
    component: StatsPanelComponent,
    canActivate: [AuthRoleGuard],
  },

  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

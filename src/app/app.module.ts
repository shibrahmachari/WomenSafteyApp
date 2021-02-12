import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './modules/Component/HomePage/authentication/authentication.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './modules/Component/HomePage/authentication/register/register.component';
import { appRoutingModule } from './app.routing';
import { SafteyPageComponent } from './modules/Component/LoggedInPage/saftey-page/saftey-page.component';
import {MatIconModule} from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
import { NgAudioRecorderModule } from 'ng-audio-recorder';
import { WebcamModule } from 'ngx-webcam';
import { WomensafteyinfoComponent } from './modules/Component/SafetyManual/womensafteyinfo/womensafteyinfo.component';
import { Router, RouterModule } from '@angular/router';
import { SelfDefenceComponent } from './modules/Component/SelfDefence/self-defence/self-defence.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    RegisterComponent,
    SafteyPageComponent,
    WomensafteyinfoComponent,
    SelfDefenceComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    appRoutingModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCg90VOk37DcWFcol4TexdCdp8CVAHl7ok',
      libraries: ['places']
    }),
    NgAudioRecorderModule,
    WebcamModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

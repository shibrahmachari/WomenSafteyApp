import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './modules/Component/HomePage/authentication/authentication.component';
import { RegisterComponent } from './modules/Component/HomePage/authentication/register/register.component';
import { SafteyPageComponent } from './modules/Component/LoggedInPage/saftey-page/saftey-page.component';
import { WomensafteyinfoComponent } from './modules/Component/SafetyManual/womensafteyinfo/womensafteyinfo.component';
import { SelfDefenceComponent } from './modules/Component/SelfDefence/self-defence/self-defence.component';



const routes: Routes = [
    { path: '', redirectTo: "login", pathMatch: "full" },
    { path: 'login', component: AuthenticationComponent  },
    { path: 'register', component: RegisterComponent },
    { path: 'womensaftey', component: SafteyPageComponent},
   
    { path: 'womensafetyinfo', component: WomensafteyinfoComponent },
    { path:'selfdefence', component: SelfDefenceComponent}
];

export const appRoutingModule = RouterModule.forRoot(routes);
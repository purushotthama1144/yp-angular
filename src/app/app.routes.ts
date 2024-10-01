import { Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { 
        path: '', component: HomeComponent , pathMatch: 'full'
    },
    { 
        path: 'home', component: HomeComponent
    },
    {
        path: 'admin-login' , component: AdminLoginComponent
    },
    { 
        path: '**', component: PagenotfoundComponent 
    },
];
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=> import('./Components/signin-component/signin-component')
        .then(a=>a.SigninComponent)
    },
    {
        path:'home',
        loadChildren:()=>import('../app/HomeRoutes').then(a=>a.Home_Routes)
    }    
];

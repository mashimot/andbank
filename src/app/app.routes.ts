import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/renda-fixa', pathMatch: 'full' },
    {
        path: 'renda-fixa',
        loadChildren: () => import('./modules/renda-fixa/renda-fixa.module')
        .then(m => m.RendaFixaModule)
    }
];

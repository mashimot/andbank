import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RendaFixaCreateEditComponent } from './containers/renda-fixa-create-edit/renda-fixa-create-edit.component';
import { RendaFixaDetailComponent } from './containers/renda-fixa-detail/renda-fixa-detail.component';
import { RendaFixaComponent } from './containers/renda-fixa/renda-fixa.component';

const routes: Routes = [
  {
    path: '',
    component: RendaFixaComponent
  },
  {
    path: 'create',
    component: RendaFixaCreateEditComponent
  },
  {
    path: ':id/edit',
    component: RendaFixaCreateEditComponent
  },
  {
    path: ':id',
    component: RendaFixaDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RendaFixaRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InitComponent } from './init/init.component';
import { SuperheroesComponent } from './superheroes/superheroes.component';
import { CreateSuperheroComponent } from './superheroes/create-superhero/create-superhero.component';
import { EditSuperheroComponent } from './superheroes/edit-superhero/edit-superhero.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: InitComponent },
      { path: 'superheroes', component: SuperheroesComponent },
      { path: 'create-superhero', component: CreateSuperheroComponent },
      { path: 'edit-superhero/:id', component: EditSuperheroComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

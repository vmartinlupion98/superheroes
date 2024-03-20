import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InitComponent } from './init/init.component';
import { HeaderComponent } from './header/header.component';
import { SuperheroesComponent } from './superheroes/superheroes.component';
import { FooterComponent } from './footer/footer.component';
import { CreateSuperheroComponent } from './superheroes/create-superhero/create-superhero.component';
import { EditSuperheroComponent } from './superheroes/edit-superhero/edit-superhero.component';
import { TranslocoRootModule } from '../../transloco-root.module';

@NgModule({
  declarations: [
    DashboardComponent,
    InitComponent,
    HeaderComponent,
    SuperheroesComponent,
    FooterComponent,
    CreateSuperheroComponent,
    EditSuperheroComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}

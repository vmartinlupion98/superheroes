import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperheroesComponent } from './superheroes.component';
import { SuperheroService } from '../../../services/superhero.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoTestingModule } from '@ngneat/transloco';

describe('SuperheroesComponent', () => {
  let component: SuperheroesComponent;
  let fixture: ComponentFixture<SuperheroesComponent>;
  let superheroService: jasmine.SpyObj<SuperheroService>;
  let router: Router;

  beforeEach(async () => {
    superheroService = jasmine.createSpyObj('SuperheroService', [
      'getSuperheroes',
      'deleteSuperhero',
    ]);
    superheroService.getSuperheroes.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [SuperheroesComponent],
      imports: [
        RouterTestingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        TranslocoTestingModule.forRoot({}),
      ],
      providers: [{ provide: SuperheroService, useValue: superheroService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheroesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    superheroService.getSuperheroes.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call getSuperheroes on init', () => {
    superheroService.getSuperheroes.and.returnValue(of([]));
    component.ngOnInit();
    expect(superheroService.getSuperheroes).toHaveBeenCalled();
  });

  it('should set dataSource data correctly on getSuperheroes', () => {
    const superheroes = [
      { id: 1, name: 'Superman', age: 30, ability: 'Flight', universe: 'DC' },
      {
        id: 2,
        name: 'Spiderman',
        age: 25,
        ability: 'Spider sense',
        universe: 'Marvel',
      },
    ];
    superheroService.getSuperheroes.and.returnValue(of(superheroes));
    component.getSuperheroes();
    expect(component.dataSource.data).toEqual(superheroes);
  });

  it('should navigate to edit superhero page when editSuperhero is called', () => {
    const id = 123;
    const routerSpy = spyOn(router, 'navigate');
    component.editSuperhero(id);
    expect(routerSpy).toHaveBeenCalledWith(['/dashboard/edit-superhero', id]);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuperheroComponent } from './edit-superhero.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperheroService } from '../../../../services/superhero.service';
import { of } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditSuperheroComponent', () => {
  let component: EditSuperheroComponent;
  let fixture: ComponentFixture<EditSuperheroComponent>;
  let mockActivatedRoute, mockRouter: { navigate: any };
  let mockSuperheroService: {
    getSuperheroes: jasmine.Spy;
    getSuperhero: jasmine.Spy;
    editSuperhero: jasmine.Spy;
  };

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        params: {
          id: 1,
        },
      },
    };

    mockRouter = jasmine.createSpyObj(['navigate']);

    mockSuperheroService = jasmine.createSpyObj('SuperheroService', [
      'getSuperheroes',
      'getSuperhero',
      'editSuperhero',
    ]);
    mockSuperheroService.getSuperheroes.and.returnValue(of([]));
    mockSuperheroService.getSuperhero.and.returnValue(
      of({
        id: 1,
        name: 'Superman',
        age: 30,
        ability: 'Flight',
        universe: 'DC',
      })
    );

    mockSuperheroService.editSuperhero.and.returnValue(of());

    await TestBed.configureTestingModule({
      declarations: [EditSuperheroComponent],
      imports: [
        ReactiveFormsModule,
        MatToolbar,
        MatCard,
        MatGridList,
        MatGridTile,
        MatFormField,
        MatInput,
        MatLabel,
        MatSelect,
        MatOption,
        NoopAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: SuperheroService, useValue: mockSuperheroService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSuperheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve superhero data on init', () => {
    expect(component.superhero).toEqual({
      id: 1,
      name: 'Superman',
      age: 30,
      ability: 'Flight',
      universe: 'DC',
    });
  });

  it('should navigate to superheroes list when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/dashboard/superheroes',
    ]);
  });

  it('should call editSuperhero and reset form on editSuperhero', () => {
    component.form.setValue({
      name: 'Batman',
      age: 35,
      ability: 'Rich',
      universe: 'DC',
    });
    component.editSuperhero();
    expect(mockSuperheroService.editSuperhero).toHaveBeenCalledWith(1, {
      name: 'Batman',
      age: 35,
      ability: 'Rich',
      universe: 'DC',
    });
    expect(component.form.value).toEqual({
      name: null,
      age: null,
      ability: null,
      universe: null,
    });
  });
});

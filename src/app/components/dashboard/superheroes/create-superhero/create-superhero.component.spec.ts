import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CreateSuperheroComponent } from './create-superhero.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SuperheroService } from '../../../../services/superhero.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateSuperheroComponent', () => {
  let component: CreateSuperheroComponent;
  let fixture: ComponentFixture<CreateSuperheroComponent>;
  let mockSuperheroService: jasmine.SpyObj<SuperheroService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    mockSuperheroService = jasmine.createSpyObj('SuperheroService', [
      'getSuperheroes',
      'createSuperhero',
    ]);
    mockSuperheroService.getSuperheroes.and.returnValue(of([]));
    mockSuperheroService.createSuperhero.and.returnValue(of());
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [CreateSuperheroComponent],
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
        { provide: SuperheroService, useValue: mockSuperheroService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSuperheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to superheroes list when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/dashboard/superheroes',
    ]);
  });

  it('should call createSuperhero and reset form on createSuperhero', () => {
    const superhero = {
      name: 'Spider-Man',
      age: 25,
      ability: 'Web-slinging',
      universe: 'Marvel',
    };
    component.form.setValue(superhero);
    component.createSuperhero();
    expect(mockSuperheroService.createSuperhero).toHaveBeenCalledWith(
      superhero
    );
    component.form.reset();
  });
});

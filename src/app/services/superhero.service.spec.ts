import { TestBed } from '@angular/core/testing';

import { SuperheroService } from './superhero.service';
import { Superhero } from '../interfaces/superhero';
import { environment } from '../../environments/environment';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('SuperheroService', () => {
  let service: SuperheroService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperheroService],
    });
    service = TestBed.inject(SuperheroService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getSuperheroes and return data', () => {
    const mockData: Superhero[] = [
      { id: 1, name: 'Superman', age: 35, ability: 'Flight', universe: 'DC' },
      {
        id: 2,
        name: 'Spider-Man',
        age: 30,
        ability: 'Web-slinging',
        universe: 'Marvel',
      },
    ];

    service.getSuperheroes().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(
      `${environment.endpoint}api/superheroes/`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should call getSuperhero and return data', () => {
    const mockIndex = 1;
    const mockData: Superhero = {
      id: 1,
      name: 'Superman',
      age: 35,
      ability: 'Flight',
      universe: 'DC',
    };

    service.getSuperhero(mockIndex).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(
      `${environment.endpoint}api/superheroes/${mockIndex}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});

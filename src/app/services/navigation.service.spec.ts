import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationService', () => {
  let service: NavigationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(NavigationService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to "/dashboard/superheroes" when goBack() is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/superheroes']);
  });
});

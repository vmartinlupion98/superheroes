import { Injectable } from '@angular/core';
import { Superhero } from '../interfaces/superhero';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/superheroes/';
  }

  getSuperheroes(): Observable<Superhero[]> {
    return this.http.get<Superhero[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  createSuperhero(superhero: Superhero): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, superhero);
  }

  editSuperhero(index: number, superhero: Superhero): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}${index}`,
      superhero
    );
  }

  deleteSuperhero(index: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${index}`);
  }

  getSuperhero(index: number): Observable<Superhero> {
    return this.http.get<Superhero>(`${this.myAppUrl}${this.myApiUrl}${index}`);
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Superhero } from '../../../interfaces/superhero';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SuperheroService } from '../../../services/superhero.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superheroes',
  templateUrl: './superheroes.component.html',
  styleUrl: './superheroes.component.css',
})
export class SuperheroesComponent implements OnInit, AfterViewInit {
  superheroes: { id: number; superhero: Superhero }[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<Superhero>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private superheroService: SuperheroService,
    private router: Router
  ) {
    this.superheroes = [];
    this.displayedColumns = ['name', 'age', 'ability', 'universe', 'actions'];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getSuperheroes();
    this.superheroService.getSuperheroes().subscribe((superheroes) => {
      this.dataSource = new MatTableDataSource(superheroes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: Superhero, filter: string) => {
        return data.name.toUpperCase().includes(filter);
      };
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSuperheroes(): void {
    this.superheroService.getSuperheroes().subscribe((superheroes) => {
      this.superheroes = superheroes.map((superhero, index) => ({
        id: index,
        superhero,
      }));
      this.dataSource.data = this.superheroes.map((entry) => entry.superhero);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toUpperCase();
    this.dataSource.filter = filterValue;
  }

  deleteSuperhero(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your superhero has been deleted.',
          icon: 'success',
        });
        this.superheroService.deleteSuperhero(id).subscribe(() => {
          this.getSuperheroes();
        });
      }
    });
  }

  editSuperhero(id: number): void {
    this.router.navigate(['/dashboard/edit-superhero', id]);
  }
}

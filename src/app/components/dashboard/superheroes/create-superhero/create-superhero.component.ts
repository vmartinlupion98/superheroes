import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Superhero } from '../../../../interfaces/superhero';
import { SuperheroService } from '../../../../services/superhero.service';
import Swal from 'sweetalert2';
import { NavigationService } from '../../../../services/navigation.service';

@Component({
  selector: 'app-create-superhero',
  templateUrl: './create-superhero.component.html',
  styleUrl: './create-superhero.component.css',
})
export class CreateSuperheroComponent implements OnInit {
  form: FormGroup;

  load: boolean;

  submitted: boolean;

  universes: string[];

  constructor(
    private fb: FormBuilder,
    private superheroService: SuperheroService,
    private navigationService: NavigationService
  ) {
    this.load = false;
    this.submitted = false;
    this.universes = ['DC', 'Marvel'];
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]*$/)],
      ],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      ability: ['', Validators.required],
      universe: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.superheroService.getSuperheroes().subscribe((superheroes) => {
      this.load = false;
    });
  }

  goBack(): void {
    this.navigationService.goBack();
  }

  setTrueSubmittedAndLoad(): void {
    this.submitted = true;
    this.load = true;
  }

  resetForm(): void {
    this.form.reset();
  }

  openModal(): void {
    setTimeout(() => {
      this.goBack();
      this.load = false;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Superhero has been created',
        showConfirmButton: false,
        timer: 1500,
      });
    }, 1500);
  }

  createSuperhero(): void {
    const superhero: Superhero = {
      name: this.form.value.name,
      age: this.form.value.age,
      ability: this.form.value.ability,
      universe: this.form.value.universe,
    };

    this.superheroService.createSuperhero(superhero).subscribe();

    this.setTrueSubmittedAndLoad();
    this.resetForm();
    this.openModal();
  }
}

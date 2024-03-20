import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Superhero } from '../../../../interfaces/superhero';
import { SuperheroService } from '../../../../services/superhero.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NavigationService } from '../../../../services/navigation.service';

@Component({
  selector: 'app-edit-superhero',
  templateUrl: './edit-superhero.component.html',
  styleUrl: './edit-superhero.component.css',
})
export class EditSuperheroComponent implements OnInit {
  form: FormGroup;

  load: boolean = false;

  submitted: boolean = false;

  universes: string[];

  id!: number;

  superhero!: Superhero;

  constructor(
    private fb: FormBuilder,
    private superheroService: SuperheroService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {
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
    this.superheroService.getSuperheroes().subscribe();
    this.id = this.route.snapshot.params['id'];
    this.superheroService.getSuperhero(this.id).subscribe((superhero) => {
      this.superhero = superhero;
      this.form.patchValue({
        name: superhero.name,
        age: superhero.age,
        ability: superhero.ability,
        universe: superhero.universe,
      });
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
        title: 'Superhero has been edited',
        showConfirmButton: false,
        timer: 1500,
      });
    }, 1500);
  }

  editSuperhero(): void {
    const superhero: Superhero = {
      name: this.form.value.name,
      age: this.form.value.age,
      ability: this.form.value.ability,
      universe: this.form.value.universe,
    };

    if (this.superhero !== null) {
      this.superheroService
        .editSuperhero(this.id, superhero)
        .subscribe(() => {});
    }
    this.setTrueSubmittedAndLoad();
    this.resetForm();
    this.openModal();
  }
}

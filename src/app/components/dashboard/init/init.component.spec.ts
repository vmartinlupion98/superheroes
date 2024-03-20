import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InitComponent } from './init.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { TranslocoTestingModule } from '@ngneat/transloco';

describe('InitComponent', () => {
  let component: InitComponent;
  let fixture: ComponentFixture<InitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitComponent],
      imports: [
        MatToolbarModule,
        MatGridList,
        MatGridTile,
        TranslocoTestingModule.forRoot({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

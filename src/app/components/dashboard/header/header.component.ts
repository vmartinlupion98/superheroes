import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../../interfaces/menu';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menu: Menu[];
  load: boolean;
  options: String[];
  selectedOption: String;

  constructor(
    private menuService: MenuService,
    private translocoService: TranslocoService
  ) {
    this.menu = [];
    this.options = ['en', 'es'];
    this.load = false;
    this.selectedOption = this.options[0];
  }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(): void {
    this.menuService.getMenu().subscribe((data) => {
      this.menu = data;
    });
  }

  clickTranslate(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.selectedOption = lang;
  }
}

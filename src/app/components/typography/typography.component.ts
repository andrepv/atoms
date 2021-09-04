import { Component, OnInit } from '@angular/core';
import { ThemeManagerService } from '../../services/theme-manager.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.less']
})
export class TypographyComponent implements OnInit {

  constructor(
    public themes: ThemeManagerService,
  ) { }

  ngOnInit(): void {
  }

}

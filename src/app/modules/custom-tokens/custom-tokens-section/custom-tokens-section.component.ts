import { Component, OnInit } from '@angular/core';
import customTokensSectionProviders from './custom-tokens-section-providers';

@Component({
  selector: 'app-custom-tokens-section',
  templateUrl: './custom-tokens-section.component.html',
  styleUrls: ['./custom-tokens-section.component.less'],
  providers: customTokensSectionProviders
})
export class CustomTokensSectionComponent implements OnInit {
  constructor() { }

  ngOnInit() {}
}

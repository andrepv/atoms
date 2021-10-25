import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {

  activeItemIndex = 0;

  items = [
    {name: 'Typography', url: '/typography', icon: '/assets/text.svg'},
    {name: 'Colors', url: '/colors', icon: '/assets/colors.svg'},
    {name: 'Spacing', url: '/spacing', icon: '/assets/spacing.svg'},
    {name: 'Shadows', url: '#', icon: '/assets/shadow.svg'},
    {name: 'Motion', url: '#', icon: '/assets/motion.svg'},
    {name: 'Borders', url: '#', icon: '/assets/border.svg'},
    {name: 'Z-Index', url: '#', icon: '/assets/z-index.svg'},
  ]

  constructor() {}

  ngOnInit() {}
}

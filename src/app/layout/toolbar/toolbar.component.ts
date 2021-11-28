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
    {name: 'Shadows', url: '/shadows', icon: '/assets/shadow.svg'},
    {name: 'Durations', url: 'durations', icon: '/assets/motion.svg'},
    {name: 'Borders', url: '/borders', icon: '/assets/border.svg'},
    {name: 'Z-Index', url: '#', icon: '/assets/z-index.svg'},
  ]

  constructor() {}

  ngOnInit() {}
}

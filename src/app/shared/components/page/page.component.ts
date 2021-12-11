import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '@core/services/editor.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less']
})
export class PageComponent implements OnInit {
  @Input() name: string

  constructor(private editor: EditorService) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.editor.isActive) {
      this.editor.disable();
    }
  }
}

import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DBGroup, StoreToken } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { BorderTokenModel, BORDER_DB_DATA } from '../borders.model';

@Component({
  selector: 'app-borders-section',
  templateUrl: './borders-section.component.html',
  styleUrls: ['./borders-section.component.less'],
  providers: [...provideSectionDeps(BORDER_DB_DATA.tableGroupName)]
})
export class BordersSectionComponent implements OnInit {
  constructor(private section: SectionContentManagerService) { }

  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: () => ({
          "color": "#fff",
          "width": 2,
          "style": "solid",
        }),
      },
    })
  }

  getBorder(token: any) {
    const {width, style, color} = token;
    return `${width}px ${style} ${color}`;
  }
}

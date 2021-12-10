import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DBGroup, StoreToken } from '@core/core.model';
import { SectionContentManagerService } from '@core/services/section-content-manager.service';
import { provideSectionDeps } from '@utils/provide-section-deps';
import { BoxShadowLayer, BoxShadowTokenModel, BOX_SHADOW_DB_DATA } from './box-shadow-section.model';

export const DEFAULT_LAYER_VALUE: BoxShadowLayer = {
  offsetX: '17px',
  offsetY: '17px',
  blur: '12px',
  spread: '2px',
  color: '#2e475a',
  inset: ''
}

@Component({
  selector: 'app-box-shadow-section',
  templateUrl: './box-shadow-section.component.html',
  styleUrls: ['./box-shadow-section.component.less'],
  providers: [...provideSectionDeps(BOX_SHADOW_DB_DATA.tableGroupName)]
})
export class BoxShadowSectionComponent implements OnInit {
  constructor(private section: SectionContentManagerService) {}
    
  ngOnInit() {
    this.section.configure({
      hooks: {
        getDefaultToken: () => ({
          backgroundColor: "#ffffff",
          blockColor: "#2d2d2d",
          layers: [DEFAULT_LAYER_VALUE]
        })
      },
    })
  }

  getBoxShadow(token: any) {
    return token.layers.reduce((accumulator: any, layers: any, index: any) => {
      let values = Object.values(layers);
      if (!values[values.length - 1]) values.pop();
      let comma = index + 1 !== token.layers.length ? ',' : '';
      accumulator += values.join(' ');
      return accumulator + comma
    }, "")
  }

  getBlockStyle(token: any) {
    return {
      backgroundColor: token.blockColor,
      boxShadow: this.getBoxShadow(token),
    }
  }


}

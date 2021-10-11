import { Component, Inject, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { getContentManagerProvider } from '../../utils/get-content-manager-provider';
import { StoreService } from '../../services/store.service';

const {token, provider} = getContentManagerProvider(db.typescale)

@Component({
  selector: 'app-typescale',
  templateUrl: './typescale.component.html',
  styleUrls: ['./typescale.component.less'],
  providers: [provider]
})
export class TypescaleComponent implements OnInit {
  readonly sectionName = "Type Scale";

  constructor(
    @Inject(token) 
    public contentManager: ContentManagerService,
    public store: StoreService,
  ) {}

  ngOnInit() {
    this.contentManager.getDefaultTokenValue = () => '16px';
  }

  onAfterChange(value: number, tokenId: number, groupId: number) {
    this.contentManager.setTokenValue(value, tokenId, groupId)
  }
}

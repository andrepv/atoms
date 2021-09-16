import { Component, Inject, OnInit } from '@angular/core';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { getContentManagerProvider } from '../../services/get-content-manager-provider';
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

  get groupList() {
    return this.store.getGroupList(this.sectionName);
  }

  constructor(
    @Inject(token) 
    public contentManager: ContentManagerService<any, any>,
    public store: StoreService,
  ) {}

  ngOnInit() {
    this.contentManager.load();
  }

  ngOnDestroy() {
    this.contentManager.subscription.unsubscribe();
  }

  addGroup() {
    const group = this.contentManager.createGroup();
    this.contentManager.addGroup(group);
  }

  addToken(groupId: number) {
    const token = this.contentManager.createToken(groupId, '');
    this.contentManager.addToken(token, groupId);
  }
}

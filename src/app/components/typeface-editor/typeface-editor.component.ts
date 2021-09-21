import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentManagerService } from '../../services/content-manager.service';
import { db } from '../../services/db.service';
import { getContentManagerProvider } from '../../services/get-content-manager-provider';
import { StoreService } from '../../services/store.service';

const {token, provider} = getContentManagerProvider(db.typeface);

@Component({
  selector: 'app-typeface-editor',
  templateUrl: './typeface-editor.component.html',
  styleUrls: ['./typeface-editor.component.less'],
  providers: [provider]
})
export class TypefaceEditorComponent implements OnInit {
  name = '';
  subsribtion: Subscription

  get group() {
    return this.store.editableGroup$.getValue();
  }

  constructor(
    @Inject(token) 
    public contentManager: ContentManagerService,
    public store: StoreService,
  ) {}

  ngOnInit() {
    this.subsribtion = this.store.editableGroup$.subscribe(value => {
      this.name = value?.name ?? '';
    });
  }

  ngOnDestroy() {
    this.subsribtion.unsubscribe();
  }

  onBlur() {
    const {name, id} = this.group;
    if (!this.name.length || this.name === name) {
      this.name = name;
      return;
    }
    this.contentManager.renameGroup(this.name, id)
  }
}

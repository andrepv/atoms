import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThemeModel } from '@core/core.model';
import { ThemeManagerService } from '@core/services/theme-manager.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  modalInputValue = "";
  loadMorePending = false;

  @ViewChild('input') inputEl: TemplateRef<any>;

  constructor(
    public themes: ThemeManagerService,
    private modal: NzModalService
  ) {}

  ngOnInit() {}

  addTheme() {
    this.modalInputValue = "";

    this.modal.create({
      nzTitle: 'Enter a name for your theme',
      nzContent: this.inputEl,
      nzOnOk: () => this.themes.add(this.modalInputValue),
    });
  }

  renameTheme() {
    this.modalInputValue = this.themes.selected.name;

    this.modal.create({
      nzTitle: 'Enter a new theme name',
      nzContent: this.inputEl,
      nzOnOk: () => this.themes.rename(this.modalInputValue),
    });
  }

  selectTheme(theme: ThemeModel) {
    this.themes.selected = theme;
  }

  deleteTheme(): void {
    const {id} = this.themes.selected;

    this.modal.confirm({
      nzTitle: 'Are you sure delete this theme?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.themes.delete(id),
      nzCancelText: 'No',
    });
  }

  async loadMore() {
    this.loadMorePending = true;
    try {
      await this.themes.loadMore();
    } finally {
      this.loadMorePending = false;
    }
  }
}
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThemeManagerService } from '../../services/theme-manager.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ThemeModel } from '../../services/db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  modalInputValue = "";
  private isDataSaving = false;
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
      nzOnOk: () => {
        this.load(() => this.themes.add(this.modalInputValue))
      },
      nzOkLoading: this.isDataSaving,
    });
  }

  renameTheme() {
    this.modalInputValue = this.themes.active.name;

    this.modal.create({
      nzTitle: 'Enter a new theme name',
      nzContent: this.inputEl,
      nzOnOk: () => {
        this.load(() => this.themes.rename(this.modalInputValue))
      },
      nzOkLoading: this.isDataSaving,
    });
  }

  changeTheme(theme: ThemeModel) {
    this.themes.active = theme;
  }

  deleteTheme(): void {
    const activeTheme = this.themes.active;

    this.modal.confirm({
      nzTitle: 'Are you sure delete this theme?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.load(() => this.themes.delete(activeTheme.id)),
      nzCancelText: 'No',
      nzOkLoading: this.isDataSaving,
    });
  }

  async loadMore() {
    this.loadMorePending = true;
    await this.themes.loadMore();
    this.loadMorePending = false;
  }

  searchTheme(value: string) {
    this.themes.search(value);
  }

  private async load(query: () => Promise<any>) {
    this.isDataSaving = true;
    try {
      await query();
    } finally {
      this.isDataSaving = false
    }
  }
}

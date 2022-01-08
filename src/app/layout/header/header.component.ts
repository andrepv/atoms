import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThemeManagerService } from '@core/services/theme-manager.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  nextThemeName = "";
  currentThemeName = "";

  nextThemeEditorVisible = false;
  currentThemeEditorVisible = false;

  @ViewChild('input') inputEl: TemplateRef<any>;

  constructor(
    public themes: ThemeManagerService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.currentThemeName = this.themes.selected.name;
  }

  addTheme() {
    this.themes.add(this.nextThemeName);
    this.nextThemeEditorVisible = false;
    this.nextThemeName = "";
  }

  renameTheme() {
    this.themes.rename(this.currentThemeName);
    this.currentThemeEditorVisible = false;
  }

  onCurrentThemeEditorOpen() {
    this.currentThemeName = this.themes.selected.name;
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
}
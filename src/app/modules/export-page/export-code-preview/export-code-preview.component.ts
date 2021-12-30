import { Component, Inject, Input, OnInit } from '@angular/core';
import { DBToken } from '@core/core.model';
import { SectionTables } from '@core/section-tables';
import { ThemeManagerService } from '@core/services/theme-manager.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CodeFormatter } from '../export-code-formatter/code-formatter';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';
import { ExportEditorService } from '../export-editor/export-editor.service';

@Component({
  selector: 'app-export-code-preview',
  templateUrl: './export-code-preview.component.html',
  styleUrls: ['./export-code-preview.component.less']
})
export class ExportCodePreviewComponent implements OnInit {
  codePreview: string[] = [];

  private groups: {groupName: string, tokens: DBToken[]}[] = [];
  private formatter: CodeFormatter = this.getCodeFormatter();
  private destroy$ = new Subject();

  constructor(
    @Inject('tables') private sectionTables: SectionTables<any, any>,
    private editor: ExportEditorService,
    private editorSection: ExportEditorSectionService,
    private themeManager: ThemeManagerService,
  ) { }

  async ngOnInit() {
    await this.load();
    await this.createCodePreview();

    this.editor.format$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.formatter = this.getCodeFormatter();
      this.createCodePreview();
    })

    this.editor.showComments$.pipe(takeUntil(this.destroy$)).subscribe(() => this.createCodePreview())

    this.editor.prefix$.pipe(takeUntil(this.destroy$)).subscribe(() => this.createCodePreview())

    if (this.editorSection.codePreviewConfigs$.getValue() !== null) {
      this.editorSection.codePreviewConfigs$.pipe(takeUntil(this.destroy$)).subscribe(() => this.createCodePreview())
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async load() {
    const tokens = await this.sectionTables.tokenTable
    .where("themeId")
    .equals(this.themeManager.selected.id)
    .toArray();
    
    const tokenGroups = await this.sectionTables.groupTable
    .where("themeId")
    .equals(this.themeManager.selected.id)
    .toArray();

    const groupsLookupTable = {};

    for (let tokenGroup of tokenGroups) {
      groupsLookupTable[tokenGroup.id] = {
        groupName: tokenGroup.name,
        tokens: []
      }
    }

    for (let token of tokens) {
      groupsLookupTable[token.groupId].tokens.push(token);
    }

    this.groups = Object.values(groupsLookupTable);
  }

  private async createCodePreview() {
    const codePreview = [];

    if (this.editor.showComments) {
      const sectionName = this.sectionTables.name.toLowerCase();
      codePreview.push(`${this.formatter.getComment(sectionName)}\n`);
    }

    codePreview.push(this.formatter.getCodeBeforeTokens());

    for (let group of this.groups) {
      if (this.editor.showComments && this.formatter.commentsAllowed) {
        const groupName = `\n${this.formatter.tokenIndent}${this.formatter.getComment(group.groupName)}`;

        codePreview.push(groupName);
      }

      const index = this.groups.indexOf(group)

      await this.createCodeLines(group.tokens, codePreview);

      if ((index + 1) !== this.groups.length) {
        codePreview.push('\n');
      }
    }

    codePreview.push(this.formatter.getCodeAfterTokens());

    this.codePreview = codePreview;

    this.editor.setSectionCode(this.sectionTables.name, this.codePreview.join(''));
  }

  private async createCodeLines(source: DBToken[], container: string[]) {
    for (let token of source) {
      const varValue = await this.getVariableValue(token);
      const codeLine = this.formatter.formatToken({
        varName: this.formatter.handleVariableName(token.name, this.editor.prefix),
        varValue,
      });
  
      container.push(`\n${codeLine}`);
    }
  }

  private async getVariableValue(token: DBToken) {
    const value = await this.editorSection.getTokenValue(token);
    return this.formatter.handleVariableValue(value);
  }

  private getCodeFormatter() {
    return new this.editorSection.codeFormatters[this.editor.format]();
  }
}

import { Injectable } from '@angular/core';
import { ExportEditorService } from '@app/components/export-editor/export-editor.service';
import SectionManagerContentService from '@core/services/section-manager-content.service';
import SectionManagerGroupsService from '@core/services/section-manager-groups.service';
import SectionManagerTokensService from '@core/services/section-manager-tokens.service';
import { StorageToken, StorageGroup } from '@core/storages/storages-types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExportEditorSectionService } from '../export-editor-section/export-editor-section.service';
import { CodeFormatter } from './export-code-formatter/code-formatter';

type GroupedTokens = {
  group: StorageGroup,
  tokens: StorageToken[]
};

@Injectable()
export class ExportCodePreviewService {
  codePreview: string[] = [];

  private groupedTokens: GroupedTokens[] = [];
  private formatter: CodeFormatter = this.exportEditorSection.getCodeFormatter();

  private destroy$ = new Subject();

  constructor(
    private groupsManager: SectionManagerGroupsService,
    private sectionManager: SectionManagerContentService,
    private tokensManager: SectionManagerTokensService,
    private exportEditor: ExportEditorService,
    private exportEditorSection: ExportEditorSectionService,
  ) { }

  async onInit() {
    await this.loadSectionContent();
    await this.createCodePreview();
    this.subscribeToExportEditor();
  }

  onDestroy() {
    this.unsubscribe();
  }

  private async loadSectionContent() {
    const groups = await this.groupsManager.load();
    const tokens = await this.tokensManager.load();

    this.groupedTokens = await this.groupTokens(tokens, groups);
  }

  private async groupTokens(
    tokens: StorageToken[],
    groups: StorageGroup[]
  ): Promise<GroupedTokens[]> {
    const groupsLookupTable: {[key: number]: GroupedTokens} = {};

    for (let group of groups) {
      groupsLookupTable[group.id] = {group, tokens: []}
    }

    for (let token of tokens) {
      groupsLookupTable[token.groupId].tokens.push(token);
    }

    return Object.values(groupsLookupTable);
  }


  private async createCodePreview() {
    const codePreview: string[] = [];

    this.addCodeBeforeMainContent(codePreview);
    await this.addMainContent(codePreview);
    this.addCodeAfterMainContent(codePreview);

    this.codePreview = codePreview;

    this.exportEditor.setSectionCode(
      this.sectionManager.name,
      this.codePreview.join('')
    );
  }

  private addCommentTitle(codePreview: string[]) {
    if (this.exportEditor.configs.showComments) {
      const sectionName = this.sectionManager.name.toLowerCase();
      codePreview.push(`${this.formatter.getComment(sectionName)}\n\n`);
    }
  }

  private addCodeBeforeMainContent(codePreview: string[]) {
    this.addCommentTitle(codePreview);
    codePreview.push(this.formatter.getCodeBeforeTokens());
  }

  private addCodeAfterMainContent(codePreview: string[]) {
    codePreview.push(this.formatter.getCodeAfterTokens());
  }

  private async addMainContent(codePreview: string[]) {
    for (let [index, group] of this.groupedTokens.entries()) {
      this.addCommentGroupName(codePreview, group);

      await this.addTokens(codePreview, group);

      this.addDivider(codePreview, index);
    }
  }

  private addCommentGroupName(codePreview: string[], group: GroupedTokens) {
    const isAllowed = (
      this.exportEditor.configs.showComments &&
      this.formatter.commentsAllowed
    );

    if (isAllowed) {
      const groupName = `${this.formatter.tokenIndent}${this.formatter.getComment(group.group.name)}\n`;

      codePreview.push(groupName);
    }
  }

  private async addTokens(
    codePreview: string[],
    groupedTokens: GroupedTokens
  ) {
    const {tokens, group} = groupedTokens;
    const {prefix} = this.exportEditor.configs;

    for (let token of tokens) {
      const tokenValue = await this.getTokenValue(token, group);
      const tokenName = this.formatter.transformTokenName(token.name, prefix);

      const codeLine = this.formatter.getToken({tokenName, tokenValue});

      const lineBreak = tokens.indexOf(token) !== tokens.length - 1 ? '\n' : ''

      codePreview.push(`${codeLine}${lineBreak}`);
    }
  }

  private async getTokenValue(token: StorageToken, group: StorageGroup) {
    const value = await this.exportEditorSection.getStyleValue({
      token,
      configs: this.exportEditorSection.codePreviewConfigs,
      group
    });
    return this.formatter.transformTokenValue(value);
  }

  private addDivider(codePreview: string[], tokensIndex: number) {
    if ((tokensIndex + 1) !== this.groupedTokens.length) {
      codePreview.push('\n\n');
    }
  }

  private subscribeToExportEditor() {
    this.exportEditor.format$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.formatter = this.exportEditorSection.getCodeFormatter();
      this.createCodePreview();
    })

    this.exportEditor.showComments$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => this.createCodePreview())

    this.exportEditor.prefix$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => this.createCodePreview())

    if (this.exportEditorSection.codePreviewConfigs$.getValue() !== null) {
      this.exportEditorSection.codePreviewConfigs$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.createCodePreview())
    }
  }

  private unsubscribe() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

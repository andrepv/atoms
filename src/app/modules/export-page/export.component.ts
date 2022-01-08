import { Component, OnInit } from '@angular/core';
import { db } from '@core/indexedDB';
import { ExportConfigs } from './export-types';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.less']
})
export class ExportComponent implements OnInit {
  configurationList: ExportConfigs[] = [];
  isLoading = true;

  constructor() {}

  async ngOnInit() {
    this.isLoading = true;
    this.configurationList = await db.exportConfigs.toArray();
    this.isLoading = false;
  }

  async addConfiguration() {
    const config: ExportConfigs = {
      name: 'My export',
      format: 'css',
      prefix: '',
      fileName: '',
      showComments: true,
      excludedSections: [],
    }
    const id = await db.exportConfigs.add(config);
    config.id = id;

    this.configurationList.push(config)
  }

  async deleteConfiguration(configId: number) {
    await db.exportConfigs.delete(configId);
    this.configurationList = this.configurationList.filter(config => config.id !== configId);

    const exportConfigSections = await db.exportConfigsSection.where("commonConfigsId").equals(configId).toArray();

    for (let exportConfigSection of exportConfigSections) {
      await db.exportConfigsSection.delete(exportConfigSection.id);
    }
  }

  renameConfiguration(value: string, config: ExportConfigs) {
    db.exportConfigs.update(config.id, {name: value});
    config.name = value;
  }
}

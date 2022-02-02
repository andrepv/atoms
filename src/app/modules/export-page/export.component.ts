import { Component, OnInit } from '@angular/core';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import { ExportConfigs } from './export-types';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.less']
})
export class ExportComponent implements OnInit {
  configurationList: ExportConfigs[] = [];
  isLoading = true;
  storage = browserStorageDB.exportConfigs;

  constructor() {}

  async ngOnInit() {
    this.isLoading = true;
    this.configurationList = await this.storage.getList();
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
    const id = await this.storage.add(config);
    config.id = id;

    this.configurationList.push(config)
  }

  async deleteConfiguration(configId: number) {
    await this.storage.delete(configId);
    this.configurationList = this.configurationList.filter(config => config.id !== configId);

    const exportConfigSections = await this.storage.get({index: "commonConfigsId", key: configId})

    for (let exportConfigSection of exportConfigSections) {
      await this.storage.delete(exportConfigSection.id);
    }
  }

  renameConfiguration(value: string, config: ExportConfigs) {
    this.storage.update(config.id, {name: value});
    config.name = value;
  }
}

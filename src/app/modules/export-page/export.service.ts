import { Injectable } from '@angular/core';
import { browserStorageDB } from '@core/storages/browser-storage/browser-storage-db';
import { ExportConfigs } from './export-types';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  list: ExportConfigs[] = [];
  isLoading = true;
  storage = browserStorageDB.exportConfigs;

  constructor() {}

  async load() {
    this.isLoading = true;
    try {
      this.list = await this.storage.loadList();
    } finally {
      this.isLoading = false;
    }
  }

  async add() {
    const config = this.create();
    const id = await this.storage.add(config);
    config.id = id;

    this.list.push(config);
  }

  async delete(configId: number) {
    await this.storage.delete(configId);
    this.list = this.list.filter(config => config.id !== configId);
    await this.deleteContent(configId);
  }

  async get(id: number) {
    const config = await this.storage.get({index: 'id', key: id});
    return config[0];
  }

  rename(value: string, config: ExportConfigs) {
    this.storage.update(config.id, {name: value});
    config.name = value;
  }

  private create(): ExportConfigs {
    return {
      name: 'My export',
      format: 'css',
      prefix: '',
      fileName: '',
      showComments: true,
      excludedSections: [],
    }
  }

  private async deleteContent(configId: number) {
    const configurationSections = await this.storage.get({
      index: "commonConfigsId", key: configId
    })

    for (let configurationSection of configurationSections) {
      await browserStorageDB.exportConfigsSection.delete(configurationSection.id);
    }
  }
}

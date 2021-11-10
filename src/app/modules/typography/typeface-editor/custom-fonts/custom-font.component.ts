import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomFont } from '../../typeface/typeface.model';
import { FontManagerService } from '../font-manager.service';
import { CustomFontsManager } from './custom-fonts-manager';

type FontPreview = {
  isActive: boolean;
  family: string;
  data: string | ArrayBuffer;
}

@Component({
  selector: 'app-custom-font',
  templateUrl: './custom-font.component.html',
  styleUrls: ['./custom-font.component.less']
})
export class CustomFontComponent implements OnInit {
  @Output() save: EventEmitter<CustomFont> = new EventEmitter();

  readonly ALLOWED_FILES  = ['.woff', '.woff2', '.ttf', '.otf']

  fontFamily = '';

  fontPreview: FontPreview = {
    isActive: false,
    family: '',
    data: '',
  }

  isDropZoneActive = false;

  fontManager: CustomFontsManager;

  constructor(fontManager: FontManagerService) {
    this.fontManager = fontManager.customFonts
  }

  ngOnInit() {}

  onDragEnter(e: any) {
    e.stopPropagation();
    e.preventDefault();

    this.isDropZoneActive = true;
  }

  onDragOver(e: any) {
    e.stopPropagation();
    e.preventDefault();
  }

  onDrop(e: any) {
    e.stopPropagation();
    e.preventDefault();

    this.handleFiles(e.dataTransfer.files);
    this.isDropZoneActive = false;
  }

  onDragLeave() {
    this.isDropZoneActive = false;
  }

  onDropZoneClick(e: any) {
    this.handleFiles(e.target.files);
  }

  handleFiles(fs: FileList) {
    if (!fs.length) return;
    
    for (let i = 0; i < fs.length; i++) {
      const file = fs[i];

      const regexp = new RegExp(`([a-zA-Z0-9\s_\\.\-:])+(${this.ALLOWED_FILES.join('|')})$`, 'i');

      if (!regexp.test(file.name)) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener("load", e => {
        const data = e?.target?.result ?? "";

        if (data) {
          const family = file.name.replace(
            new RegExp(`(${this.ALLOWED_FILES.join('|')})$`, 'i'),
            ''
          )
          this.fontManager.addCustomFontPreview(data)
          this.fontPreview = {isActive: true, family, data};
          this.fontFamily = family;
        }
      });
    }
  }

  onBlur() {
    const value = this.fontFamily;
    if (!value.length) {
      this.fontFamily = this.fontPreview.family;
      return;
    }
    this.fontFamily = value.trim();
  }

  saveFont() {
    this.save.emit({
      family: this.fontFamily,
      type: "custom-font",
      data: this.fontPreview.data,
    });

    this.fontManager.addCustomFont(
      this.fontFamily,
      this.fontPreview.data
    );

    this.fontPreview.isActive = false;
  }
}

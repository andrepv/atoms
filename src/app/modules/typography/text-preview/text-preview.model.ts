export interface TextPreview {
  styles: {
    fontFamily: string,
    fontSize: string,
    lineHeight: number,
    letterSpacing: string,
  },
  text: string,
  backgroundColor: string,
  color: string,
  styleRefs?: {[K in keyof TextPreview['styles']]?: number} | false,
}

export type TextPreviewStyles = TextPreview['styles'];
export type TextPreviewStyleProps = keyof TextPreviewStyles;
export type TextPreviewStyleValue = TextPreviewStyles[TextPreviewStyleProps]
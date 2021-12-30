import { CodeFormatterCSS } from "./code-formatter-css";
import { CodeFormatterJS } from "./code-formatter-js";
import { CodeFormatterLess } from "./code-formatter-less";
import { CodeFormatterSass } from "./code-formatter-sass";
import { CodeFormatterScss } from "./code-formatter-scss";
import { CodeFormatterStyl } from "./code-formatter-styl";

export const standardFormatters = {
  css: CodeFormatterCSS,
  js: CodeFormatterJS,
  less: CodeFormatterLess,
  sass: CodeFormatterSass,
  scss: CodeFormatterScss,
  styl: CodeFormatterStyl,
}
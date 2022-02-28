import { MDCBanner } from "@material/banner";
import { MDCRipple } from "@material/ripple/index";

new MDCRipple(document.querySelector('.mdc-button.mdc-banner__primary-action'))

const banner = new MDCBanner(document.querySelector('.mdc-banner'))
banner.open()
export const MESSAGE_CONFIG = {
  MAX_COUNT: 3,
  DURATION: 3,
};

export const BUTTON_TYPES = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  DASHED: 'dashed',
  TEXT: 'text',
  LINK: 'link',
  GHOST: 'ghost',
} as const;

export const ALERT_TYPES = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export const SPIN_SIZES = {
  SMALL: 'small',
  DEFAULT: 'default',
  LARGE: 'large',
} as const;

export const ROW_ALIGN = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom',
} as const;

export const ROW_JUSTIFY = {
  START: 'start',
  END: 'end',
  CENTER: 'center',
  SPACE_AROUND: 'space-around',
  SPACE_BETWEEN: 'space-between',
} as const;

export const TITLE_LEVELS = {
  DISPLAY: 1,
  HEADING: 2,
  SUBHEADING: 3,
  LABEL: 4,
  CAPTION: 5,
} as const;

export const TEXT_TYPES = {
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export const FORM_LAYOUTS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  INLINE: 'inline',
} as const;

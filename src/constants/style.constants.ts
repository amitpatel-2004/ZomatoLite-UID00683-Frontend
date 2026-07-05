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

export const BADGE_SIZES = {
  DEFAULT: 'default',
  SMALL: 'small',
} as const;

export const PENDING_ORDERS_BADGE_OFFSET: [number, number] = [10, 0];

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

export const MODAL_WIDTHS = {
  NARROW: 480,
  MEDIUM: 560,
  WIDE: 720,
} as const;

export const TAG_COLORS = {
  ACTIVE: 'success',
  INACTIVE: 'default',
  PENDING: 'default',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export const SELECT_MODES = {
  MULTIPLE: 'multiple',
  TAGS: 'tags',
  COMBOBOX: 'combobox',
} as const;

export const BUTTON_SIZES = {
  LARGE: 'large',
  MIDDLE: 'middle',
  SMALL: 'small',
} as const;

export const TIME_FORMAT = {
  HOURS_MINUTES: 'HH:mm',
} as const;

export const SIDER_WIDTHS = {
  DEFAULT: 320,
} as const;

export const UPLOAD_LIST_TYPES = {
  PICTURE_CARD: 'picture-card',
} as const;

export const BUTTON_SHAPES = {
  ICON: 'circle',
  PILL: 'round',
} as const;

export const POPOVER_PLACEMENT = {
  BOTTOM_RIGHT: 'bottomRight',
  BOTTOM_LEFT: 'bottomLeft',
  TOP_RIGHT: 'topRight',
  TOP_LEFT: 'topLeft',
} as const;

export const POPCONFIRM_PLACEMENT = {
  TOP: 'top',
  TOP_RIGHT: 'topRight',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM_RIGHT: 'bottomRight',
} as const;

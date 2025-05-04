// Types for Telegram WebApp
export interface TelegramUser {
  id: number | string;
  username?: string;
  firstName?: string;
  lastName?: string;
  languageCode?: string;
  isPremium?: boolean;
  [key: string]: any;
}

export interface TelegramInitDataUnsafe {
  user?: TelegramUser;
  queryId?: string;
  startParam?: string;
  authDate?: string;
  hash?: string;
  canSendAfter?: number;
  [key: string]: any;
}

export type TelegramButtonType = 'default' | 'ok' | 'close' | 'cancel' | 'destructive';

export interface TelegramButton {
  type: TelegramButtonType;
  text: string;
  id?: string;
}

export interface TelegramPopupParams {
  title?: string;
  message: string;
  buttons?: TelegramButton[];
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: TelegramInitDataUnsafe;
  version?: string;
  colorScheme?: 'light' | 'dark';
  themeParams?: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    [key: string]: any;
  };
  isExpanded?: boolean;
  viewportHeight?: number;
  viewportStableHeight?: number;
  headerColor?: string;
  backgroundColor?: string;
  BackButton?: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  MainButton?: {
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    text: string;
    color: string;
    textColor: string;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
  showPopup: (params: TelegramPopupParams, callback?: (buttonId: string) => void) => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  showProgress: () => void;
  stopProgress: () => void;
  isVersionAtLeast: (version: string) => boolean;
  setTooltipPosition: (x: number, y: number) => void;
  [key: string]: any;
} 
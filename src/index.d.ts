export {};

declare global {
  interface Window {
    Calendly: {
      initInlineWidget?: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string>;
        utm?: Record<string>;
      }) => void;
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
      }) => void;
      initPopupWidget: (options: {
        url: string;
        prefill?: Record<string>;
        utm?: Record<string>;
      }) => void;
    };
  }
}

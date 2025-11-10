export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export type CardVariant = "default" | "outlined" | "elevated";

export type InputVariant = "default" | "error" | "success";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export type ToastType = "success" | "error" | "warning" | "info";

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface StepComponentProps {
  nextStep: () => void;
  prevStep: () => void;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
}

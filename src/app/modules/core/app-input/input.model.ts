export interface InputButton {
  icon: string;
  action: () => void;
  buttonClass?: string;
}

export interface AppInput {
  value: string;
  placeholder: string;
  buttons?: InputButton[];
  maxLength?: number;
}

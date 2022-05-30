export type MyRegisterOptions = {
  required?: string,
  minLength?: {
    value: number,
    message: string,
  },
  maxLength?: {
    value: number,
    message: string,
  },
  pattern?: {
    value: string,
    message: string,
  },
};

export type RegExpPatterns = {
  [key: string]: string;
};

export type FormField = {
  name: string;
  registerOptions: MyRegisterOptions;
  type: string;
  label: string;
  placeholder: string;
};

export type AppFormData = {
  title: string;
  order: number;
  name: string;
  login: string;
  password: string;
  description: string;
};

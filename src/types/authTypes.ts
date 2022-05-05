export type IsAuth = boolean;

// Auth form types
export type AuthFormInput = {
  name: string;
  password: string;
};

export type AuthInputType = keyof AuthFormInput;

export type RegExpPatterns = {
  [key: string]: RegExp;
};

type AuthIputProperties = {
  id: string;
  type: 'text' | 'password' | 'email',
  placeholder: string,
  autoComplete?: string;
};

type RegisterOpion = {
  value: number;
  message: string;
};

type RegisterPattern = {
  value: RegExp;
  message: string;
};

type RegisterOptions = {
  required: string;
  minLength?: RegisterOpion;
  maxLength?: RegisterOpion;
  pattern?: RegisterPattern;
};

export type AuthInput = {
  properties: AuthIputProperties;
  registerOptions: RegisterOptions;
  labelText: string;
};

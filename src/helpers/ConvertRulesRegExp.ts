import { RegisterOptions } from 'react-hook-form';
import { MyRegisterOptions } from '../types/authTypes';

const convertRulesRegExp = (options: MyRegisterOptions): RegisterOptions => {
  if (options.pattern) {
    const re = new RegExp(options.pattern.value);
    return {
      ...options,
      pattern: {
        value: re,
        message: options.pattern.message,
      },
    };
  }
  return options as RegisterOptions;
};

export default convertRulesRegExp;

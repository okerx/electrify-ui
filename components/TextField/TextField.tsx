import { forwardRef, useId } from 'react';
import { TextFieldProps } from './types';
import * as S from './styles';

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      label,
      errorMessage,
      helperText,
      fullWidth = false,
      error = false,
      color = 'primary',
      ...props
    },
    ref,
  ) => {
    const defaultInputId = useId();
    const inputId = id || defaultInputId;

    return (
      <S.StyledTextField $fullWidth={fullWidth} $error={error} $color={color}>
        <S.TextFieldWrapper>
          <input
            ref={ref}
            type="text"
            id={inputId}
            placeholder={label}
            data-testid="text-field-input"
            {...props}
          />
          <label htmlFor={inputId}>{label}</label>
        </S.TextFieldWrapper>
        <S.TextFieldHelperText $error={error}>
          {errorMessage || helperText}
        </S.TextFieldHelperText>
      </S.StyledTextField>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;

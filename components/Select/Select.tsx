import { forwardRef, useId } from 'react';
import { SelectProps } from './types';
import * as S from './styles';

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      hideDetails,
      error = false,
      helperText,
      id,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const defaultInputId = useId();
    const inputId = id || defaultInputId;

    return (
      <S.StyledSelect $error={error}>
        <S.SelectWrapper>
          <select ref={ref} {...props}>
            {options.map(({ value, title }) => (
              <option key={String(value)} value={String(value)}>
                {title}
              </option>
            ))}
          </select>
          {label && <label htmlFor={inputId}>{label}</label>}
        </S.SelectWrapper>
        {!hideDetails && (
          <S.SelectHelperText $error={error}>
            {errorMessage || helperText}
          </S.SelectHelperText>
        )}
      </S.StyledSelect>
    );
  },
);

Select.displayName = 'Select';

export default Select;

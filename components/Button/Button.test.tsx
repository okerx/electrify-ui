import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/theme';
import Button from '@/components/Button/Button';
import { ButtonVariant } from '@/components/Button/types';

const variantStyles = {
  contained: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },

  outlined: {
    color: theme.palette.primary.main,
  },
};

describe('<Button />', () => {
  it('should have the correct styles for each variant', () => {
    const variants: (ButtonVariant | undefined)[] = [
      undefined,
      'contained',
      'outlined',
    ];
    variants.forEach((variant?: ButtonVariant) => {
      const { unmount } = render(
        <ThemeProvider theme={theme}>
          <Button variant={variant}>Test Button</Button>
        </ThemeProvider>,
      );

      const button = screen.getByText('Test Button');

      expect(button).toHaveStyle({
        ...variantStyles[variant || 'contained'],
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '4px',
        transition:
          'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,' +
          'box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,' +
          'border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,' +
          'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      });

      unmount();
    });
  });

  it('should render button with loading', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button loading>Test Button</Button>
      </ThemeProvider>,
    );

    expect(() => screen.getByText('Test Button')).toThrow();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should render disabled button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button disabled>Test Button</Button>
      </ThemeProvider>,
    );

    expect(screen.getByText('Test Button')).toHaveStyle({
      borderColor: 'rgba(0, 0, 0, 0)',
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      color: 'rgba(0, 0, 0, 0.26)',
    });

    // TODO: add `disabled` test cases for other variants
  });
});

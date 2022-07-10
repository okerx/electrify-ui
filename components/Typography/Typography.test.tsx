import { render, screen } from '@testing-library/react';
import theme from '@/theme';
import Typography from './Typography';
import { TypographyVariant } from './types';
import { ThemeProvider } from '@emotion/react';
import { VARIANTS_MAP } from '@/components/Typography/constants';

describe('<Typography />', () => {
  it('should have the corresponding styles for each variant', () => {
    const variants = Object.keys(VARIANTS_MAP) as TypographyVariant[];

    variants.forEach(variant => {
      const { unmount } = render(
        <ThemeProvider theme={theme}>
          <Typography variant={variant}>Hello, world</Typography>
        </ThemeProvider>,
      );

      const typography = screen.getByText('Hello, world');

      expect(typography).toHaveStyle({
        ...theme.typography[variant],
      });

      unmount();
    });
  });

  it('renders `span` by default', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography>Hello, world</Typography>
      </ThemeProvider>,
    );

    const typography = screen.getByText('Hello, world').closest('span');

    expect(typography).toBeInTheDocument();
  });

  it('renders `p` for paragraphs', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography paragraph>Hello, world</Typography>
      </ThemeProvider>,
    );

    const typography = screen.getByText('Hello, world').closest('p');

    expect(typography).toBeInTheDocument();
  });

  it('renders with the default tag for each variant', () => {
    const variants = Object.keys(VARIANTS_MAP) as TypographyVariant[];

    variants.forEach(variant => {
      const { unmount } = render(
        <ThemeProvider theme={theme}>
          <Typography variant={variant}>Hello, world</Typography>
        </ThemeProvider>,
      );

      const typography = screen
        .getByText('Hello, world')
        .closest(VARIANTS_MAP[variant]);

      expect(typography).toBeInTheDocument();

      unmount();
    });
  });

  it('overrides any default tag by passing `component` prop', () => {
    const variants = Object.keys(VARIANTS_MAP) as TypographyVariant[];

    variants.forEach(variant => {
      const { unmount } = render(
        <ThemeProvider theme={theme}>
          <Typography variant={variant} component="a">
            Hello, world
          </Typography>
        </ThemeProvider>,
      );

      const typography = screen.getByText('Hello, world').closest('a');

      expect(typography).toBeInTheDocument();

      unmount();
    });
  });
});

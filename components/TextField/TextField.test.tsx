import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/theme';
import TextField from './TextField';

describe('<TextField />', () => {
  it('should render text field', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextField label="Test label" />
      </ThemeProvider>,
    );

    expect(screen.getByText('Test label')).toBeInTheDocument();
    expect(screen.getByTestId('text-field-input')).toBeInTheDocument();
  });

  it('should change the text field colors on error', () => {
    render(
      <ThemeProvider theme={theme}>
        <TextField label="Test label" error />
      </ThemeProvider>,
    );

    const input = screen.getByTestId('text-field-input');
    const label = screen.getByText('Test label');

    expect(input).toHaveStyle({
      border: `1px solid ${theme.palette.error.main}`,
    });

    expect(label).toHaveStyle({
      color: theme.palette.error.main,
    });

    fireEvent.click(input);

    expect(input).toHaveStyle({
      border: `1px solid ${theme.palette.error.main}`,
    });

    expect(label).toHaveStyle({
      color: theme.palette.error.main,
    });
  });
});

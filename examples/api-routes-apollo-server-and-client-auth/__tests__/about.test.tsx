import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import About from '@/pages/about';

test('renders about page', () => {
  render(<About />);
  const aboutElement = screen.getByText(/Welcome to the about page/i);
  expect(aboutElement).toBeInTheDocument();
});

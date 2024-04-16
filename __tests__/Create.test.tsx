import { it, expect, assert, vi, afterEach, describe } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import PostForm from '@/components/PostForm';
import { cleanup } from '@testing-library/react'

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
})

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      // get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

it('should have a heading', () => {
  render(<PostForm />);
  const heading = within(screen.getByRole<HTMLHeadingElement>('heading', {level: 2, name: 'Luo julkaisu'}));
  expect(heading).toBeDefined();
});

it('should render post form with 3 fields', () => {
  render(<PostForm />);
  const form = within(screen.getByRole<HTMLFormElement>('form'));
  expect(form.getByRole('button')).toBeDefined();

  const inputs = form.getAllByRole('textbox');
  expect(inputs.length).toBe(3);

  expect(screen.getByLabelText('Yrityksen nimi')).toBeDefined();
  expect(screen.getByLabelText('Otsikko')).toBeDefined();
  expect(screen.getByLabelText('Sisältö')).toBeDefined();

});



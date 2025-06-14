import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for toBeInTheDocument()
import App from './App';

describe('App Component', () => {
    test('renders the app title', () => {
        render(<App />);
        const headingElement = screen.getByText(/Hello, MeCash!/i);
        expect(headingElement).toBeInTheDocument();
    });
});

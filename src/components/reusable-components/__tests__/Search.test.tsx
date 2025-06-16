import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReusableSearchBar from "../Search";


describe('ReusableSearchBar', () => {
    it('renders without crashing', () => {
        render(<ReusableSearchBar />);
    });

    it('renders Add button with label and calls onButtonClick when clicked', () => {
        const handleClick = jest.fn();
        render(
            <ReusableSearchBar
                buttonAddLabel="Add Repo"
                onButtonClick={handleClick}
            />
        );
        const buttonElement = screen.getByText('Add Repo');
        expect(buttonElement).toBeInTheDocument();
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalled();
    });
});

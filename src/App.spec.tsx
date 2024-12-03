import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
    localStorage.clear();
})

it('resets all votes to zero while keeping options intact', () => {
    render(<App />);

    const option1VoteButton = screen.getAllByText('Vote', { selector: 'button' })[0];
    fireEvent.click(option1VoteButton);
    fireEvent.click(option1VoteButton);

    const resetButton = screen.getByText(/Reset Votes/i);
    fireEvent.click(resetButton);

    const option1Votes = screen.getByText(/Candidate: Option 1/).nextSibling?.textContent;
    expect(option1Votes).toContain('Votes: 0');
});

it('prevents adding duplicate options', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Add new option');
    fireEvent.change(input, { target: { value: ' Option 4 ' } });
    fireEvent.click(screen.getByText('Add Option'));

    fireEvent.change(input, { target: { value: 'option 4' } });
    fireEvent.click(screen.getByText('Add Option'));

    const allOptions = screen.queryAllByText(/Candidate: Option 4/i);
    console.log(allOptions);
    expect(allOptions.length).toBe(1);
});

it('shows "No votes yet" when all options have zero votes', () => {
    render(<App />);
    const topOptionMessage = screen.getByText(/No votes yet/i);
    expect(topOptionMessage).toBeInTheDocument();
});


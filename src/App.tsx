import React, { useState, useEffect } from 'react';
import VotingOption from './components/VotingOption';

// 1: Enter "Option 1 " in the input field and click "Add Option"
// Can you ensure that there would be no duplicate options?

// 2. Click Reset Votes
// Can you ensure that all votes are reset to 0?

// 3. Finally check all tests if they are still passing.

// Enhancement: Add percentages to voting options.

interface Votes {
    [key: string]: number;
}

const App: React.FC = () => {
    const [votes, setVotes] = useState<Votes>(() => {
        const savedVotes = localStorage.getItem('votes');
        return savedVotes ? JSON.parse(savedVotes) : { "Option 1": 0, "Option 2": 0, "Option 3": 0 };
    });

    const [newOption, setNewOption] = useState<string>('');
    useEffect(() => {
        localStorage.setItem('votes', JSON.stringify(votes));
    }, [votes]);

    const handleVote = (option: string) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [option]: prevVotes[option] + 1,
        }));
    };

    const handleAddOption = () => {
        if (newOption.trim() && !(newOption in votes)) {
            setVotes((prevVotes) => ({ ...prevVotes, [newOption]: 0 }));
            setNewOption('');
        }
    };

    const handleReset = () => {
        console.log('reset')
    };

    const getTopOption = (): string => {
        const entries = Object.entries(votes);
        const maxVotes = Math.max(...entries.map(([_, count]) => count));
        const topOptions = entries.filter(([_, count]) => count === maxVotes).map(([option]) => option);
        return topOptions.join(', ');
    };
    

    
    

    return (
        <div style={{ margin: '20px' }}>
            <h1>Voting System</h1>
            {Object.entries(votes).map(([option, count]) => (
                <VotingOption
                    key={option}
                    option={option}
                    votes={count}
                    onVote={() => handleVote(option)}
                />
            ))}
            <h2>Top Option(s): {getTopOption()}</h2>

            <div>
                <input
                    type="text"
                    placeholder="Add new option"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                />
                <button onClick={handleAddOption}>Add Option</button>
            </div>
            <button onClick={handleReset} style={{ marginTop: '10px' }}>
                Reset Votes
            </button>
        </div>
    );
};

export default App;

import React from 'react';

interface VotingOptionProps {
    option: string;
    votes: number;
    onVote: () => void;
}

const VotingOption: React.FC<VotingOptionProps> = ({ option, votes, onVote }) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <h3>Candidate: {option}</h3>
            <p>Votes: {votes}</p>
            <button onClick={onVote}>Vote</button>
        </div>
    );
};

export default VotingOption;

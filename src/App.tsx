import React from 'react';
import * as ReactDOM from 'react-dom';
import './App.scss';
import Quiz from './Quiz';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Quiz
                    title={"Test Quiz"}
                    questions={[
                        {
                            question: 'What is 1 + 1?',
                            answers: ['11', '2'],
                            correctAnswer: 1,
                            answerRationale: '2 is the correct answer because you cannot simply put the numbers next to each other.'
                        },
                        {
                            question: 'Who was the first president of the U.S.?',
                            answers: ['George Washington', 'Abraham Lincoln'],
                            correctAnswer: 0,
                            answerRationale: 'George Washington became the first president on April 30, 1789.'

                        },
                        {
                            question: 'Who made this quiz?',
                            answers: ['Zach Romano', 'Bill Gates', 'Random Developer', 'Jeff Bezos'],
                            correctAnswer: 0,
                            answerRationale: 'Zach Romano made this app while learning React.'
                        }
                    ]}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

export default App;

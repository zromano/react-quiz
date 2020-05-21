import * as React from 'react';
import PropTypes from 'prop-types';
import './Quiz.scss';
import {Button, Paper} from "@material-ui/core";

interface QuestionData {
    question: string;
    answers: Array<string>;
    correctAnswer: number;
    answerRationale?: string;
}

interface IProps {
    title: string;
    questions: Array<QuestionData>;
}

interface IState {
    curQuestion: number;
    questionsCompleted: number;
    numberRight: number;
    currentRationale: string;
}

class Quiz extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        questions: PropTypes.array.isRequired,
    };

    public static defaultProps: Partial<IProps> = {
        // default props here
    };

    public state: IState = {
        curQuestion: 1,
        questionsCompleted: 0,
        numberRight: 0,
        currentRationale: '',
    };

    public nextQuestion = () => {
        if (this.state.curQuestion < this.props.questions.length) {
            const curQuestion = this.state.curQuestion + 1;
            this.setState({curQuestion});
        }
    };

    curQuest(): QuestionData {
        return this.props.questions[this.state.curQuestion - 1];
    }

    handleSelection(event: React.MouseEvent<HTMLButtonElement>) {
        if (this.state.questionsCompleted === this.props.questions.length) {
            return;
        }
        if (event.currentTarget.id === this.curQuest().correctAnswer.toString()) {
            this.handleCorrect();
        } else {
            this.handleWrong();
        }
        const questionsCompleted = this.state.questionsCompleted + 1;
        this.setState({questionsCompleted})
        this.nextQuestion();
    }

    handleCorrect() {
        const numberRight = this.state.numberRight + 1;
        const answerRationale = this.curQuest().answerRationale || '';
        const currentRationale = 'Correct! ' + answerRationale;
        this.setState({numberRight, currentRationale});
    }

    handleWrong() {
        const answerRationale = this.curQuest().answerRationale || '';
        const currentRationale = 'Wrong. ' + answerRationale;
        this.setState({currentRationale});
    }

    renderAnswers() {
        return (
            this.curQuest().answers.map(
                (answer, index) => {
                    return (
                        <Button
                            variant="contained"
                            id={index.toString()}
                            key={index}
                            onClick={this.handleSelection}
                        >
                            {answer}
                        </Button>
                    )
                }
            )
        );
    }

    render() {
        return (
            <Paper className={'quiz'}>
                <h1>{this.props.title}</h1>
                <p className={'quiz.rationale'}>{this.state.currentRationale}</p>
                <p className={'quiz.numberRight'}>Score: {this.state.numberRight}/{this.state.questionsCompleted}</p>
                <p className={'quiz.questionNumber'}>
                  Current Question: {this.state.curQuestion}/{this.props.questions.length}
                </p>
                <h2 className={'quiz.questionLabel'}>Question:</h2>
                <p className={'quiz.question'}>{this.curQuest().question}</p>
                {this.renderAnswers()}
            </Paper>
        );
    }
}


export default Quiz;
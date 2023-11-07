import Question from "./Question";
import Answer from "./Answer";
import styles from './QuestionAnswers.module.css';

const QuestionAnswers = ({questions, type}) => {
  return (
      <div className={styles.container}>
        {questions.map((question, idx) => <div key={question + idx}>
          <Question question={question} type={type}/>
          <Answer question={question} num={idx} type={type}/>
        </div>)}
      </div>
  )
}

export default QuestionAnswers;
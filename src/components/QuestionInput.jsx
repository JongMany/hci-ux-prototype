import {useState} from "react";
import styles from './QuestionInput.module.css';


const QuestionInput = ({setQuestionList, questionList, type}) => {
  const [question, setQuestion] = useState('');

  const changeHandler = (e) => {
    setQuestion(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!question.length) return;
    const questions = [...questionList, question];
    setQuestionList(questions);
    setQuestion('');
    localStorage.removeItem('question' + type);
    localStorage.setItem('question' + type, JSON.stringify(questions));
  }

  return (<section className={styles['question-container']}>
    <form onSubmit={submitHandler}>
      <input onChange={changeHandler} value={question} placeholder='질문을 입력해보세요'
             className={styles['question-input']}/>
      <button type='submit' className={styles['submit-btn']}>제출</button>
    </form>
  </section>)
}

export default QuestionInput;
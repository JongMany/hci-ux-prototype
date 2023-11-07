import styles from './Question.module.css'

const Question = ({question}) => {
  return (
      <div className={styles['question-section']} >
        <div className={styles.icon}>You:</div>
        <div className={styles.question} style={{whiteSpace: 'pre-wrap', fontSize: '0.75rem'}}>{question}</div>
      </div>
  );
}

export default Question;
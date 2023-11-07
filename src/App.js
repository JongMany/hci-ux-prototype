import styles from './App.module.css';
import QuestionInput from "./components/QuestionInput";
import {useEffect, useState} from "react";
import QuestionAnswers from "./components/QuestionAnswers";
import {answers} from "./help/answer";
import {aiType} from "./help/aiType";


function App() {
  const [submitType, setSubmitType] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [questionList, setQuestionList] = useState([]);

  // const addQuestion = (question) => {
  //   setQuestionList((questions) => [...questions, question]);
  // }

  useEffect(() => {
    if (!submitType.length) return;

    const questions = JSON.parse(localStorage.getItem('question' + submitType)) || [];

    setQuestionList(questions);

  }, [submitType]);


  if (!submitType.length) {
    return (
        <div className={styles['form-container']}>
          <form onSubmit={(e) => {
            e.preventDefault();
            setSubmitType(selectedType);
          }}>
            <div>
              <div>
                <label htmlFor="text">텍스트만</label>
                <input type="radio" value="text" id="text" name="aiType"
                       onChange={(e) => {
                         setSelectedType(e.target.value);
                       }}/>
              </div>
              <div>
                <label htmlFor="text+image">텍스트+이미지1개</label>
                <input type="radio" value="text+image" id="text+image" name="aiType"
                       onChange={(e) => {
                         setSelectedType(e.target.value);
                       }}/>
              </div>
              <div>
                <label htmlFor="text+image3">텍스트+이미지 3개</label>
                <input type="radio" value="text+image3" id="text+image3" name="aiType"
                       onChange={(e) => {
                         setSelectedType(e.target.value);
                       }}/>
              </div>
            </div>
            <div>
              <button type='submit'>시작</button>
              <button type='button' onClick={() => {
                localStorage.removeItem('question' + aiType.textImage3)
                localStorage.removeItem('question' + aiType.textImage)
                localStorage.removeItem('question' + aiType.text)
                localStorage.removeItem('answers' + aiType.textImage3)
                localStorage.removeItem('answers' + aiType.textImage)
                localStorage.removeItem('answers' + aiType.text)
              }}>
                리셋
              </button>
            </div>
          </form>
        </div>);
  }

  return (
      <div className="App">
        <header className={styles.header}>
          <div className={styles['button-container']}>
            <button onClick={() => {
              setSubmitType('')
            }}>뒤로가기
            </button>
            <button onClick={() => {
              localStorage.removeItem('answers' + submitType)
              localStorage.removeItem('question' + submitType)
              setQuestionList([])
            }}>초기화
            </button>
          </div>
          <p>
            AI Service
          </p>

        </header>
        <QuestionAnswers questions={questionList} type={submitType}/>
        <QuestionInput questionList={questionList} setQuestionList={setQuestionList} type={submitType}/>
      </div>

  )
      ;

}

export default App;

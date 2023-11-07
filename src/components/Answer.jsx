import Loading from "./Loading";
import {useEffect, useState} from "react";
import {answers} from "../help/answer";
import styles from './Answer.module.css';
import {aiType} from "../help/aiType";
import {keywords} from "../help/keywords";
import {texts} from "../help/textAnswers";


const Answer = ({question, num, type}) => {
  const localAnswers = JSON.parse(localStorage.getItem('answers' + type));
  const [isVisible, setIsVisible] = useState(true);
  const localAnswer = localAnswers ? localAnswers[num]?.answer : ''
  const [answer, setAnswer] = useState(localAnswer);

  useEffect(() => {
    // if (answer?.length > 0) {
    //   setAnswer(answers[num].answer);
    //   setIsVisible(false);
    //   return;
    // }
    let time = 1000;
    if (aiType.textImage) time = 2500;
    if (aiType.textImage3) time = 4500;
    setTimeout(() => {
      const keywords = hasKeywordsInSentence(question)

      if (keywords.length) {
        // 키워드에 맞는 답변을 세팅
        const aiAnswer = getAnswersByAI(type, keywords);
        // setAnswer(answers[num].answer);
        console.log(aiAnswer)
        setAnswer(aiAnswer)
      } else {
        setAnswer({text: '학습되지 않은 키워드입니다...'});
      }
      setIsVisible(false);
    }, time);
  }, []);

  return (<div className={styles['answer-section']}>
        <div className={styles.icon}>AI:</div>
        <div className={styles.answer}>
          {!isVisible &&
              answer.imgSrcs &&
              answer.imgSrcs.map((src, idx) => <img key={idx} src={src} width='300'
                                                    height='200'/>)}
          <p style={{whiteSpace: 'pre-wrap', fontSize: '0.75rem'}}>{!isVisible && answer.text}</p>
          <Loading isVisible={isVisible}/>
        </div>
      </div>
  )
}

function hasKeywordsInSentence(sentence) {
  const results = [];
  for (const keyword of keywords) {
    if (sentence.includes(keyword)) {
      results.push(keyword);
    }
  }
  return results;
}

function getAnswersByAI(type, keywords) {
  const results = {}
  const keyword = getKeyword(keywords);
  if (type === aiType.textImage) {
    results.imgSrcs = [`${process.env.PUBLIC_URL}/assets/images/${keyword}/1.png`];
  } else if (type === aiType.textImage3) {
    results.imgSrcs = [`${process.env.PUBLIC_URL}/assets/images/${keyword}/2.png`, `${process.env.PUBLIC_URL}/assets/images/${keyword}/3.png`, `${process.env.PUBLIC_URL}/assets/images/${keyword}/4.png`];
  }
  results.text = texts[keyword];

  return results;
}

function getKeyword(keywords) {
  // ['레일리 산란', '레일리산란', '리소좀', '블록체인', '자이가르닉', '페르소나', '자이가르닉 효과', '페르소나 효과', '자이가르닉효과', '페르소나효과']
  if (keywords.includes('레일리'))
    return '레일리산란';
  else if (keywords.includes('리소좀'))
    return '리소좀';
  else if (keywords.includes('비트코인') || keywords.includes('블록체인') || keywords.includes('코인'))
    return '블록체인';
  else if (keywords.includes('자이가르닉'))
    return '자이가르닉';
  else if (keywords.includes('페르소나'))
    return '페르소나';
  else
    return null;
}

export default Answer;
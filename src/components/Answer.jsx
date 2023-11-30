import Loading from './Loading';
import { useEffect, useState } from 'react';
import { answers } from '../help/answer';
import styles from './Answer.module.css';
import { aiType } from '../help/aiType';
import { keywords } from '../help/keywords';
import { texts } from '../help/textAnswers';

const Answer = ({ question, num, type }) => {
  const localAnswers = JSON.parse(localStorage.getItem('answers' + type));
  const [isVisible, setIsVisible] = useState(true);
  const localAnswer = localAnswers ? localAnswers[num]?.answer : '';
  const [answer, setAnswer] = useState(localAnswer);

  useEffect(() => {
    // if (answer?.length > 0) {
    //   setAnswer(answers[num].answer);
    //   setIsVisible(false);
    //   return;
    // }
    let time = 1000;
    if (aiType.textImage) time = 2500;
    if (aiType.textImage3) time = 7000;
    setTimeout(() => {
      const keywords = hasKeywordsInSentence(question);
      console.log(keywords);
      if (keywords.length) {
        // 키워드에 맞는 답변을 세팅
        const aiAnswer = getAnswersByAI(type, keywords);
        // setAnswer(answers[num].answer);
        console.log(aiAnswer);
        setAnswer(aiAnswer);
      } else {
        setAnswer({ text: '학습되지 않은 키워드입니다...' });
      }
      setIsVisible(false);
    }, time);
  }, []);

  return (
    <div className={styles['answer-section']}>
      <div className={styles.icon}>AI:</div>
      <div className={styles.answer}>
        {!isVisible &&
          answer.imgSrcs &&
          answer.imgSrcs.map((src, idx) => (
            <img
              key={idx}
              src={src}
              style={{
                width: '30vw',
                maxWidth: '30vw',
                height: 'auto',
              }}
              alt={idx}
              // height='auto'
            />
          ))}
        <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.75rem' }}>
          {!isVisible && answer.text}
        </p>
        <Loading isVisible={isVisible} />
      </div>
    </div>
  );
};

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
  const results = {};
  const keyword = getKeyword(keywords);
  let num = 0;
  if (type === aiType.text) num = 0;
  if (type === aiType.textImage) num = 1;
  if (type === aiType.textImage3) num = 2;

  if (type === aiType.textImage) {
    results.imgSrcs = [
      `${process.env.PUBLIC_URL}/assets/images/${keyword}/1.png`,
    ];
  } else if (type === aiType.textImage3) {
    results.imgSrcs = [
      `${process.env.PUBLIC_URL}/assets/images/${keyword}/2.png`,
      `${process.env.PUBLIC_URL}/assets/images/${keyword}/3.png`,
      `${process.env.PUBLIC_URL}/assets/images/${keyword}/4.png`,
    ];
  }
  results.text = texts[keyword][num];

  return results;
}

function getKeyword(keywords) {
  // ['레트로', '레트로 바이러스', '레트로바이러스', '압전효과', '압전 효과', '반추동물', '반추 동물', '트리핀 딜레마', '트리핀딜레마', '트리핀']
  // ['레일리 산란', '레일리산란', '리소좀', '블록체인', '자이가르닉', '페르소나', '자이가르닉 효과', '페르소나 효과', '자이가르닉효과', '페르소나효과']
  console.log(keywords);
  if (keywords.includes('레트로') || keywords.includes('레트로 바이러스'))
    return '레트로바이러스';
  else if (keywords.includes('압전효과') || keywords.includes('압전 효과'))
    return '압전효과';
  else if (
    keywords.includes('반추 동물') ||
    keywords.includes('반추동물') ||
    keywords.includes('반추')
  )
    return '반추동물';
  else if (keywords.includes('트리핀') || keywords.includes('트리핀딜레마'))
    return '트리핀딜레마';
  else return null;
}

export default Answer;

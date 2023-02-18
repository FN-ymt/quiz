'use strict';

{
  // クイズ要素 jsだけでクイズを追加可能にする
  const QUIZ_VALUE = [
    {
      number: 1,
      question: '日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？',
      picture: 'img/img-quiz01.png',
      item: ['約28万人', '約79万人', '約183万人'],
      quote: '経済産業省 2019年3月 － IT 人材需給に関する調査',
    },
    {
      number: 2,
      question: '既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？',
      picture: 'img/img-quiz02.png',
      item: ['INTECH', 'BIZZTECH', 'X-TECH'],
      quote: '',
    },
    {
      number: 3,
      question: 'IoTとは何の略でしょう？',
      picture: 'img/img-quiz03.png',
      item: ['Internet of Things', 'Integrate into Technology', 'Information on Tool'],
      quote: '',
    },
    {
      number: 4,
      question: '日本が目指すサイバー空間とフィジカル空間を高度に融合させたシステムによって開かれる未来社会のことを何と言うでしょうか？',
      picture: 'img/img-quiz04.png',
      item: ['Society 5.0', 'CyPhy', 'SDGs'],
      quote: 'Society5.0 - 科学技術政策 - 内閣府',
    },
    {
      number: 5,
      question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
      picture: 'img/img-quiz05.png',
      item: ['Web3.0', 'NFT', 'メタバース'],
      quote: '',
    },
    {
      number: 6,
      question: '先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？',
      picture: 'img/img-quiz06.png',
      item: ['約2倍', '約5倍', '約11倍'],
      quote: 'Accenture Technology Vision 2021',
    },
  ];

  const quiz = document.getElementById('quiz_template');
  let quiz_questioned = [];

  for (let i = 0; i < QUIZ_VALUE.length; i++) {
    let real_i = i;
    for (let j = 0; j >= 0; j++) {
      let r = Math.floor(Math.random() * QUIZ_VALUE.length);
      if (quiz_questioned.includes(r) === false) {
        i = r;
        quiz_questioned.push(i);
        break;
      } else {
        continue;
      }
    }
    
    const quiz_content = quiz.content.cloneNode(true);

    const data_quiz = quiz_content.querySelector('.js-quiz');
    data_quiz.setAttribute("data-quiz", i);

    quiz_content.querySelector('.quiz_question_title_box').textContent = `Q${real_i+1}`;
    quiz_content.querySelector('.quiz_question_title_text').textContent = QUIZ_VALUE[i].question;
    quiz_content.querySelector('.quiz_question_pct').innerHTML = ("<img src='" + QUIZ_VALUE[i].picture + "' width=718>");

    let btn_list = [];
    for (let k = 1; k <= 3; k++) {
      for (let j = 0; j >= 0; j++) {
        let r = Math.floor(Math.random() * 3);
        if (btn_list.includes(r) === false) {
          quiz_content.querySelector('.quiz_answer_list_item_btn_' + k).innerHTML = (QUIZ_VALUE[i].item[r] + "<i class=\"u-icon_arrow\"></i>");
          btn_list.push(r);
          const answer_content = quiz_content.querySelector(`.quiz_answer_list_item_btn_${k}`);
          answer_content.setAttribute("data-answer", r);
          break;
        } else {
          continue;
        }
      }
    }

    if (QUIZ_VALUE[i].quote !== '') {
      quiz_content.querySelector('.quiz_quote').innerHTML = '<i class="u-icon_note"></i>' + QUIZ_VALUE[i].quote;
    } else {
      quiz_content.querySelector('.quiz_quote').classList.add('quiz_quote_hidden');
    }

    i = real_i;

    document.getElementById('quiz_temp').appendChild(quiz_content);
  }
  
  // 回答一覧
  const CORRECT_ANSWERS = [
    {
      index: 1,
      value: '約79万人'
    },
    {
      index: 2,
      value: 'X-TECH'
    },
    {
      index: 0,
      value: 'Internet of Things'
    },
    {
      index: 0,
      value: 'Society 5.0'
    },
    {
      index: 0,
      value: 'Web3.0'
    },
    {
      index: 1,
      value: '約5倍'
    }
  ];

  // すべての問題を取得
  const allQuiz = document.querySelectorAll('.js-quiz');

  // buttonタグにdisabledを付与
  const setDisabled = answers => {
    answers.forEach(answer => {
      answer.disabled = true;
    })
  }
  // trueかfalseで出力する文字列を出し分ける
  const setTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? '正解！' : '不正解...';
    // isCorrect -> L66  // 条件式 ? trueの処理 : falseの処理
  }
  const setClassName = (target, isCorrect) => {
    target.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
    // isCorrect -> L66  // 条件式 ? trueの処理 : falseの処理
  }

  // 各問題の中での処理
  allQuiz.forEach(quiz => {
    const answers = quiz.querySelectorAll('.js-answer');  // どれが正解か
    // getAttribute メソッドは指定した属性名の属性値を取得  // Number()で数値化
    const selectedQuiz = Number(quiz.getAttribute('data-quiz'));  // どの問題か
    const answerBox = quiz.querySelector('.js-answerBox');  // 答え全体
    const answerTitle = quiz.querySelector('.js-answerTitle');  // 正解か不正解か
    const answerText = quiz.querySelector('.js-answerText');  // 正解

    answers.forEach(answer => {
      answer.addEventListener('click', () => {
        // classList.add('')でクラスを追加、classList.remove('')でクラスを削除
        answer.classList.add('is-selected');

        // getAttribute メソッドは指定した属性名の属性値を取得
        const selectedAnswer = Number(answer.getAttribute('data-answer'));

        // 全てのボタンを非活性化
        setDisabled(answers);

        // 正解ならtrue, 不正解ならfalseをcheckCorrectに格納
        const isCorrect = CORRECT_ANSWERS[selectedQuiz].index === selectedAnswer;

        // 回答欄にテキストやclass名を付与
        answerText.innerText = CORRECT_ANSWERS[selectedQuiz].value;
        setTitle(answerTitle, isCorrect);
        setClassName(answerBox, isCorrect);
      })
    })
  })
}
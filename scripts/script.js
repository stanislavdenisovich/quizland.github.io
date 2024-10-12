const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const questionElem = document.getElementById('question');
const optionsElem = document.getElementById('options');
const timerElem = document.getElementById('timer');
const nextBtn = document.getElementById('next-btn');
let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let totalTime = 0;
let quizInterval;
const questions = [
    // {
    //     question: "Выберите все языки программирования, которые используются для веб-разработки:",
    //     options: ["Python", "JavaScript", "C++", "HTML"],
    //     answer: [1, 3], // Правильные ответы
    //     type: "multiple"
    // },
    {
        question: "Энеолит(медно-каменный век)",
        options: ["III-II тыс. до н.э.", "I тыс. до н.э.", "Начало XI в", "1643 г."],
        answer: 0, 
        type: "single"
    },
    {
        question: "Освоение бронзы(сплава меди и олова)",
        options: ["начало 2 тыс. дл н.э.", "начало 3 тыс. дл н.э.", "начало 1 тыс. дл н.э.", "конец 2 тыс. дл н.э."],
        answer: 0,
        type: "single"
    },
    {
        question: "Начало освоения железа",
        options: ["начало 2 тыс. до н.з.", "середина 1 тыс. до н.з.", "начало 1 тыс. до н.з.", "конец 3 тыс. до н.з."],
        answer: 2,
        type: "single"
    },
    {
        question: "В каком периоде существовали союзы саков?",
        options: ["2 тыс. до н.э.", "1 тыс. до н.э.", "1 тыс. н.э.", "2 тыс. н.э."],
        answer: 1,
        type: "single"
    },
    {
        question: "Когда сформировалось кочевое скотоводство?",
        options: ["VIII в. до н.э.", "1 тыс. до н.э.", "1645 г.", "960 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Когда были созданы самые древние сакские курганы на территории Казахстана?",
        options: ["VIII в. до н.э.", "XII в.", "1465 г.", "751 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "В каком году правил Модэ у кочевых гуннов?",
        options: ["603–704 гг.", "1643 г.", "Конец III в. до н.э.", "Начало XI в."],
        answer: 2,
        type: "single"
    },
    {
        question: "Когда произошла битва между персами и саками?",
        options: ["552–603 гг.", "530 г. до н.э.", "1235 г.", "1680–1715 гг."],
        answer: 1,
        type: "single"
    },
    {
        question: "Когда существовал Тюркский каганат?",
        options: ["552–603 гг.", "Начало XVI в.", "942–1212 гг.", "960 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Когда существовал Западнотюркский каганат?",
        options: ["1723 г.", "1465 г.", "1643 г.", "603–704 гг."],
        answer: 3,
        type: "single"
    },
    {
        question: "Когда существовал Тюрокский каганат?",
        options: ["1230 г.", "1680 г.", "704–756 гг.", "XII в."],
        answer: 2,
        type: "single"
    }
    ,
    {
        question: "Когда состоялась Атлахская (Таласская) битва?",
        options: ["751 г.", "1382 г.", "Начало XI в.", "1726 г."],
        answer: 0,
        type: "single"
    }
    ,
    {
        question: "В какой период существовал Карлукский каганат?",
        options: ["1342–1357 гг.", "1582–1583 гг.", "1728 г.", "756–940 гг."],
        answer: 3,
        type: "single"
    }
    ,
    {
        question: "Когда родился Абу Насыр аль-Фараби?",
        options: ["870 г.", "751 г.", "1643 г.", "Конец XI в."],
        answer: 0,
        type: "single"
    }
    ,
    {
        question: "Когда существовало государство Караханидов?",
        options: ["Начало XVI в.", "1342–1357 гг.", "942–1212 гг.", "1465 г."],
        answer: 2,
        type: "single"
    }
    ,
    {
        question: "Когда существовали кимаки?",
        options: ["Конец IX в. – начало XI в.", "530 г. до н.э.", "1645 г.", "1583 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Когда была написана поэма Юсуфа Баласагуни Кутадгу билик?",
        options: ["1643 г.", "1428–1468 гг.", "870 г.", "XI в."],
        answer: 3,
        type: "single"
    }
    ,
    {
        question: "В каком веке был написан труд Ходжа Ахмеда Ясави Дивани Хикмет?",
        options: ["1523 г.", "XII в.", "1723 г.", "1428 г."],
        answer: 1,
        type: "single"
    }
    ,
    {
        question: "Когда произошло провозглашение ислама государственной религией Караханидов?",
        options: ["960 г.", "1382 г.", "1465 г.", "Начало XVI в."],
        answer: 0,
        type: "single"
    }
    ,
    {
        question: "Когда существовало Кыпчакское ханство?",
        options: ["1582–1583 гг.", "1428–1468 гг.", "Начало XI – начало XIII вв.", "1643 г."],
        answer: 2,
        type: "single"
    }
    ,
    {
        question: "Когда правил Жаныбек в Золотой Орде?",
        options: ["Начало XVI в.", "756–940 гг.", "1428 г.", "1342–1357 гг."],
        answer: 3,
        type: "single"
    }
    ,
    {
        question: "В каком году произошел поджог Москвы ханом Тохтамышем?",
        options: ["960 г.", "XII в.", "1382 г.", "1230 г."],
        answer: 2,
        type: "single"
    },
    {
        question: "Когда существовал Абулхаир?",
        options: ["530 г. до н.э.", "1428–1468 гг.", "1327 г.", "Конец IX в."],
        answer: 1,
        type: "single"
    }
    ,
    {
        question: "Когда произошло образование Казахского ханства?",
        options: ["1382 г.", "1582 г.", "1465 г.", "1726 г."],
        answer: 2,
        type: "single"
    }
    ,
    {
        question: "Когда правил хан Касым?",
        options: ["Начало XVI в.", "1645 г.", "1428 г.", "1327 г."],
        answer: 0,
        type: "single"
    }
];


let correctAnswersData = []; // Массив для хранения правильных ответов

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// Перемешиваем массив вопросов
shuffle(questions);

function startQuiz() {
    document.getElementById('start-container').style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
    quizInterval = setInterval(() => totalTime++, 1000); // Увеличиваем общее время на 1 каждую секунду
}

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        questionElem.textContent = q.question;
        optionsElem.innerHTML = ''; // Очищаем предыдущие варианты
        quizContainer.style.opacity = '0'; // Начинаем анимацию с исчезновением
        setTimeout(() => {
            quizContainer.style.opacity = '1'; // Затем плавное появление нового вопроса
        }, 200);

        q.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.textContent = option;
            btn.className = 'option-button'; // Добавляем класс для стиля
            btn.onclick = () => handleAnswer(index);
            optionsElem.appendChild(btn);
        });

        timeLeft = 20;
        timerElem.textContent = `Время: ${timeLeft} секунд`;
        timer = setInterval(countDown, 1000);
        nextBtn.style.display = 'none'; // Скрыть кнопку "Следующий вопрос"
    } else {
        endQuiz();
    }
}



function handleAnswer(index) {
    clearInterval(timer); // Останавливаем таймер
    const q = questions[currentQuestion];

    // Проверяем, правильно ли ответил пользователь
    const isCorrect = (index === q.answer);
    const feedbackElem = document.getElementById('answer-feedback'); // Элемент для вывода сообщения
    feedbackElem.style.display = 'block';
    
    if (isCorrect) {
        score++;
        feedbackElem.textContent = 'Правильно!';
        feedbackElem.style.color = 'green'; // Цвет сообщения "Правильно"
    } else {
        feedbackElem.textContent = 'Неправильно!';
        feedbackElem.style.color = 'red'; // Цвет сообщения "Неправильно"
    }

    // Подсветим правильный ответ
    const buttons = document.querySelectorAll('.option-button');
    buttons[q.answer].classList.add('correct'); // Подсвечиваем правильный ответ
    if (!isCorrect) {
        buttons[index].classList.add('incorrect'); // Подсвечиваем неправильный ответ
    }

    // Делаем все кнопки неактивными, чтобы нельзя было повторно нажать
    buttons.forEach(button => {
        button.disabled = true; // Отключаем все кнопки
    });

    // Сохраним информацию о правильных и выбранных ответах для итогового экрана
    correctAnswersData.push({
        question: q.question,
        correctAnswer: q.options[q.answer],
        selectedAnswer: q.options[index],
        isCorrect: isCorrect
    });

    // Скрываем сообщение через 2 секунды и показываем кнопку "Следующий вопрос"
    setTimeout(() => {
        feedbackElem.style.display = 'none'; // Скрываем сообщение
        nextBtn.style.display = 'block'; // Показываем кнопку "Следующий вопрос"
    }, 2000); // 2 секунды задержки
}





function countDown() {
    timeLeft--;
    timerElem.textContent = `Время: ${timeLeft} секунд`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        // Увеличиваем индекс текущего вопроса
        currentQuestion++;
        loadQuestion(); // Загружаем следующий вопрос без вывода сообщений
    }
}


let achievementCount = 0; // Количество достижений

function endQuiz() {
    clearInterval(quizInterval);
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.style.opacity = '1';
    
    // Обновляем результат
    document.getElementById('result').textContent = `Вы ответили правильно на ${score} из ${questions.length} вопросов. Общее время: ${totalTime} секунд.`;
    
    // Очищаем список правильных ответов перед добавлением новых
    const answersList = document.getElementById('answers-list');
    answersList.innerHTML = ''; // Очищаем предыдущие результаты
    
    // Вывод правильных ответов для каждого вопроса
    correctAnswersData.forEach((data, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>Вопрос ${index + 1}: ${data.question}</span><br>
            <span>Ваш ответ: ${data.selectedAnswer || 'Не отвечено'}</span><br>
            <span>Правильный ответ: ${data.correctAnswer}</span>
        `;
        
        // Если ответ правильный, добавляем класс 'correct', иначе 'incorrect'
        if (data.isCorrect) {
            listItem.classList.add('correct');
        } else {
            listItem.classList.add('incorrect');
        }
        answersList.appendChild(listItem);
    });

    // Обновляем текст результата с количеством правильных ответов
    const resultsText = document.getElementById('result');
    resultsText.textContent += ` Ваши правильные ответы: ${score} из ${questions.length}.`;

    // Если все ответы правильные, показываем достижение
    if (score === questions.length) {
        // Увеличиваем счетчик достижений
        let achievementCount = parseInt(localStorage.getItem('achievementCount')) || 0;
        achievementCount++; // Увеличиваем счетчик
        localStorage.setItem('achievementCount', achievementCount); // Сохраняем новое значение
        showAchievement(); // Показываем медаль достижения
    }

    // Обработчик кнопки "Выйти", чтобы сбросить результаты
    document.getElementById('exit-btn').addEventListener('click', function() {
        // Очищаем список правильных ответов
        while (answersList.firstChild) {
            answersList.removeChild(answersList.firstChild); // Удаляем все элементы
        }

        // Очищаем текст результата
        document.getElementById('result').textContent = '';

        // Скрываем результаты и показываем стартовый экран
        resultContainer.style.display = 'none';
        startContainer.style.display = 'block';

        // Очистка других данных викторины, если требуется (например, сброс очков)
        score = 0;
        totalTime = 0;
    });
}






function showAchievement() {
    const achievement = document.getElementById('achievement');
    achievement.style.display = 'flex'; // Отображаем как flex для центрирования

        
    // Увеличиваем количество достижений
}


// Обработчик события для кнопки закрытия
document.getElementById('close-btn').addEventListener('click', function() {
    const achievement = document.getElementById('achievement');
    achievement.style.display = 'none'; // Убрать достижение
});



const exitBtn = document.getElementById('exit-btn');
exitBtn.addEventListener('click', () => {

    
    resultContainer.style.display = 'none';
    document.getElementById('start-container').style.display = 'block'; // Возвращаем на начальный экран
    // Сброс состояния викторины
    currentQuestion = 0;
    score = 0;
    timeLeft = 10;
    totalTime = 0;
    clearInterval(timer);
    clearInterval(quizInterval);
});

nextBtn.addEventListener('click', () => {
    currentQuestion++; // Увеличиваем индекс текущего вопроса
    loadQuestion(); // Загружаем следующий вопрос
});

startBtn.addEventListener('click', startQuiz);















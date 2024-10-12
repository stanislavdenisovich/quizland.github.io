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
    {
        "question": "Что является источником права в Республике Казахстан?",
        "options": [
            "Обычаи",
            "Конституция ",
            "Традиции",
            "Мораль"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какой орган осуществляет контроль за соблюдением Конституции в Республике Казахстан?",
        "options": [
            "Верховный Суд",
            "Конституционный Совет ",
            "Парламент",
            "Генеральная Прокуратура"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Кто имеет право на законодательную инициативу в Республике Казахстан?",
        "options": [
            "Президент",
            "Парламент",
            "Правительство",
            "Все вышеуказанные органы "
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Каким актом регулируются трудовые отношения в Республике Казахстан?",
        "options": [
            "Конституцией",
            "Гражданским кодексом",
            "Трудовым кодексом ",
            "Налоговым кодексом"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Что из перечисленного не относится к правам человека?",
        "options": [
            "Право на образование",
            "Право на жизнь",
            "Право на участие в управлении государством",
            "Право на нарушение закона "
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Кто имеет право выступать с обвинением в суде по уголовному делу?",
        "options": [
            "Судья",
            "Адвокат",
            "Прокурор ",
            "Обвиняемый"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Какое из перечисленных прав граждан может быть ограничено в условиях чрезвычайного положения?",
        "options": [
            "Право на жизнь",
            "Свобода передвижения ",
            "Право на образование",
            "Право на неприкосновенность личности"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какое из перечисленных лиц не может быть избрано депутатом Мажилиса?",
        "options": [
            "Лицо с судимостью",
            "Лицо с двойным гражданством ",
            "Лицо, достигшее 25 лет",
            "Лицо, прошедшее военную службу"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Что из перечисленного относится к функциям государства?",
        "options": [
            "Ведение войны",
            "Обеспечение правопорядка ",
            "Установление религиозных обрядов",
            "Личное обогащение"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Что такое правоспособность?",
        "options": [
            "Способность гражданина выполнять обязанности",
            "Способность гражданина иметь и осуществлять права ",
            "Способность гражданина участвовать в выборах",
            "Способность гражданина быть избранным на государственную должность"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какое из перечисленных понятий связано с гражданским правом?",
        "options": [
            "Административная ответственность",
            "Уголовное наказание",
            "Договор купли-продажи ",
            "Нарушение общественного порядка"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Кто является гарантом соблюдения прав и свобод граждан в Республике Казахстан?",
        "options": [
            "Конституционный Совет",
            "Президент ",
            "Парламент",
            "Верховный Суд"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Что из перечисленного является административным правонарушением?",
        "options": [
            "Кража",
            "Превышение скорости на дороге ",
            "Нанесение тяжких телесных повреждений",
            "Неуплата налогов"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Что из перечисленного относится к мерам уголовного наказания?",
        "options": [
            "Штраф",
            "Предупреждение",
            "Лишение свободы ",
            "Исправительные работы"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Какой орган имеет право принимать законы в Республике Казахстан?",
        "options": [
            "Конституционный Совет",
            "Парламент ",
            "Верховный Суд",
            "Правительство"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какой возрастной порог установлен для избрания президентом Республики Казахстан?",
        "options": [
            "30 лет",
            "35 лет",
            "40 лет ",
            "50 лет"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Кто назначает судей в Республике Казахстан?",
        "options": [
            "Президент ",
            "Верховный Суд",
            "Парламент",
            "Министерство Юстиции"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Какое из перечисленных прав относится к социально-экономическим правам граждан?",
        "options": [
            "Право на свободу слова",
            "Право на труд ",
            "Право на личную неприкосновенность",
            "Право на свободу передвижения"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Кто в Республике Казахстан осуществляет правоохранительную деятельность?",
        "options": [
            "Прокуратура ",
            "Министерство финансов",
            "Министерство здравоохранения",
            "Конституционный Совет"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Какое из перечисленных наказаний может быть применено за административное правонарушение?",
        "options": [
            "Лишение свободы",
            "Штраф ",
            "Пожизненное заключение",
            "Арест на срок более 10 лет"
        ],
        "answer": 1,
        "type": "single"
    }
]



;
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















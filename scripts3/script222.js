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
        "question": "Какой документ является высшим законом в Республике Казахстан?",
        "options": [
            "Уголовный кодекс",
            "Конституция",
            "Гражданский кодекс",
            "Трудовой кодекс"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Кто в Республике Казахстан обладает правом издавать указы, имеющие силу закона?",
        "options": [
            "Парламент",
            "Премьер-министр",
            "Президент",
            "Конституционный Совет"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Какое из перечисленных прав не может быть ограничено даже в условиях чрезвычайного положения?",
        "options": [
            "Право на образование",
            "Право на жизнь",
            "Право на труд",
            "Право на собственность"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Что из перечисленного является одной из функций Конституционного Совета Республики Казахстан?",
        "options": [
            "Осуществление правосудия",
            "Оценка конституционности законов",
            "Контроль за исполнением бюджета",
            "Назначение министров"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какой орган в Казахстане рассматривает дела о преступлениях против государства?",
        "options": [
            "Суд присяжных",
            "Специальные суды",
            "Верховный Суд",
            "Военные трибуналы"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Что является основанием для приобретения гражданства Республики Казахстан?",
        "options": [
            "Постоянное проживание в стране не менее 5 лет",
            "Достижение 18 лет",
            "Рождение на территории страны",
            "Сдача экзамена по казахскому языку"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Какое из следующих лиц не может быть избрано депутатом Мажилиса Парламента?",
        "options": [
            "Лицо с двойным гражданством",
            "Гражданин Республики Казахстан, достигший 25 лет",
            "Лицо, не имеющее судимости",
            "Лицо, прошедшее военную службу"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Какой орган власти осуществляет функции государственного управления в Казахстане?",
        "options": [
            "Правительство",
            "Президент",
            "Верховный Суд",
            "Парламент"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Какие права и свободы граждан могут быть ограничены в условиях чрезвычайного положения?",
        "options": [
            "Свобода передвижения",
            "Право на жизнь",
            "Право на образование",
            "Право на защиту"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Что из перечисленного относится к административной ответственности?",
        "options": [
            "Уголовное наказание",
            "Лишение свободы",
            "Исправительные работы",
            "Арест на срок до 15 суток"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Какое право обладает каждый гражданин Казахстана в случае нарушения его прав?",
        "options": [
            "Право на апелляцию в суд",
            "Право на самооборону",
            "Право на подачу жалобы в правительство",
            "Право на получение компенсации от государства"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Как называется система прав и обязанностей, регулирующая отношения между гражданами?",
        "options": [
            "Административное право",
            "Уголовное право",
            "Конституционное право",
            "Гражданское право"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Какая мера наказания может быть применена к лицу за совершение административного правонарушения?",
        "options": [
            "Лишение свободы",
            "Штраф",
            "Лишение гражданства",
            "Конфискация имущества"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какая из перечисленных обязанностей возлагается на граждан Республики Казахстан?",
        "options": [
            "Защита Отечества",
            "Получение высшего образования",
            "Соблюдение религиозных обрядов",
            "Обучение за рубежом"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Что считается основанием для начала уголовного дела в Республике Казахстан?",
        "options": [
            "Жалоба гражданина",
            "Судебное решение",
            "Преступление, зафиксированное государственными органами",
            "Постановление правительства"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Кто может выступать истцом в гражданском процессе в Республике Казахстан?",
        "options": [
            "Физические и юридические лица",
            "Только физические лица",
            "Только юридические лица",
            "Только государственные органы"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Какой вид наказания в Казахстане считается альтернативой лишению свободы?",
        "options": [
            "Общественные работы",
            "Исправительные работы",
            "Штраф",
            "Лишение водительских прав"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какие права имеют несовершеннолетние лица в соответствии с законодательством Республики Казахстан?",
        "options": [
            "Полное право на труд с 16 лет",
            "Право на голосование с 16 лет",
            "Право на управление транспортным средством с 14 лет",
            "Ограниченное право на труд с 14 лет"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Какое действие является правонарушением?",
        "options": [
            "Соблюдение правил дорожного движения",
            "Нарушение общественного порядка",
            "Заключение трудового договора",
            "Обжалование судебного решения"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Что означает термин 'реабилитация' в уголовном праве?",
        "options": [
            "Полное восстановление прав после оправдательного приговора",
            "Освобождение от наказания",
            "Условное осуждение",
            "Применение амнистии"
        ],
        "answer": 0,
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















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
        "question": "Что является основным источником права в Республике Казахстан?",
        "options": [
            "Конституция Республики Казахстан",
            "Декреты президента",
            "Постановления правительства",
            "Решения местных судов"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Какое из следующих лиц считается дееспособным в полной мере?",
        "options": [
            "Лицо, достигшее 14 лет",
            "Лицо, достигшее 16 лет",
            "Лицо, достигшее 18 лет",
            "Лицо, достигшее 21 года"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Какое наказание в уголовном праве Казахстана не предусмотрено за преступления?",
        "options": [
            "Лишение свободы",
            "Исправительные работы",
            "Смертная казнь",
            "Штраф"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Как называется основной документ, который устанавливает права и обязанности граждан Республики Казахстан?",
        "options": [
            "Гражданский кодекс",
            "Конституция Республики Казахстан",
            "Административный кодекс",
            "Трудовой кодекс"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какой орган в Республике Казахстан имеет право объявить чрезвычайное положение?",
        "options": [
            "Парламент",
            "Президент",
            "Верховный суд",
            "Правительство"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какое из следующих прав закреплено в Конституции Республики Казахстан?",
        "options": [
            "Право на бесплатное высшее образование",
            "Право на частную собственность",
            "Право на получение социальной поддержки от государства",
            "Право на свободное передвижение между странами"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Как называется сделка, которая считается недействительной с момента ее заключения?",
        "options": [
            "Прекращенная сделка",
            "Оспоримая сделка",
            "Ничтожная сделка",
            "Действительная сделка"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Что означает принцип 'презумпции невиновности'?",
        "options": [
            "Человек считается виновным до доказательства обратного",
            "Человек считается невиновным до тех пор, пока его вина не будет доказана",
            "Обвиняемый обязан доказывать свою невиновность",
            "Суд имеет право обвинить лицо без доказательств"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какой возраст наступления уголовной ответственности в Казахстане за большинство преступлений?",
        "options": [
            "14 лет",
            "16 лет",
            "18 лет",
            "21 год"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Кто в Казахстане обладает правом законодательной инициативы?",
        "options": [
            "Граждане Республики Казахстан",
            "Президент Республики Казахстан",
            "Парламент Республики Казахстан",
            "Все вышеуказанные"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Что из перечисленного является правонарушением?",
        "options": [
            "Соблюдение закона",
            "Нарушение установленного правопорядка",
            "Заключение трудового договора",
            "Создание компании"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какое право имеет лицо при задержании полицией?",
        "options": [
            "Право на молчание",
            "Право на бесплатное питание",
            "Право на выезд за границу",
            "Право на изменение имени"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Какой вид ответственности наступает за административные правонарушения?",
        "options": [
            "Уголовная ответственность",
            "Гражданско-правовая ответственность",
            "Дисциплинарная ответственность",
            "Административная ответственность"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Что из перечисленного является формой собственности в Республике Казахстан?",
        "options": [
            "Личная собственность",
            "Коммунальная собственность",
            "Частная и государственная собственность",
            "Все вышеперечисленное"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "К какому виду права относится Трудовой кодекс Республики Казахстан?",
        "options": [
            "Конституционное право",
            "Административное право",
            "Гражданское право",
            "Трудовое право"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Какой орган в Казахстане обладает правом пересматривать судебные решения?",
        "options": [
            "Президент",
            "Конституционный Совет",
            "Верховный суд",
            "Правительство"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Кто из перечисленных лиц не имеет права голосовать на выборах в Казахстане?",
        "options": [
            "Лицо, достигшее 18 лет",
            "Лицо, признанное судом недееспособным",
            "Лицо с двойным гражданством",
            "Лицо, зарегистрированное по месту жительства"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Какая из перечисленных обязанностей возлагается на граждан Казахстана Конституцией?",
        "options": [
            "Платить налоги",
            "Проходить медицинское обследование",
            "Соблюдать диеты",
            "Участвовать в выборах"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Какое наказание не относится к уголовному в Казахстане?",
        "options": [
            "Лишение свободы",
            "Лишение водительских прав",
            "Арест",
            "Штраф"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Кто является главным гарантом прав и свобод граждан в Республике Казахстан?",
        "options": [
            "Премьер-министр",
            "Президент Республики Казахстан",
            "Верховный суд",
            "Парламент"
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















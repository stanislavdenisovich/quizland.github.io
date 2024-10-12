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
        "question": "Первое кругосветное путешествие окончательно доказало:",
        "options": [
            "Что в сутках 24 часа",
            "Что Земля имеет форму шара",
            "Что в 1 часе 60 минут",
            "Что в году 365 дней"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Основателем первой философской школы в Греции считается:",
        "options": [
            "Аристофан",
            "Фалес",
            "Эсхил",
            "Гиппократ"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Переяславская рада в 1654 г. постановила:",
        "options": [
            "Заключить военный союз с Россией",
            "Продолжать войну с Польшей",
            "Заключить союз с Крымским ханом",
            "Перейти во власть Московского царя"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Арабский халифат при династии Омейядов был разделен на:",
        "options": [
            "Пять владений",
            "Четыре владения",
            "Семь владений",
            "Шесть владений"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Основатель города Москва в 1147 году:",
        "options": [
            "Андрей Боголюбский",
            "Владимир Мономах",
            "Юрий Долгорукий",
            "Ярослав Осмомысл"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Родина конфуцианства:",
        "options": [
            "Китай",
            "Индия",
            "Персия",
            "Вавилония"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Индульгенция означает:",
        "options": [
            "Отступник от веры",
            "Грамота о прощении грехов",
            "Церковный суд",
            "Сожжение на костре"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "В 1974 году в Португалии произошел переворот получивший название:",
        "options": [
            "\"Революция роз\"",
            "\"Бархатная революция\"",
            "\"Революция лилий\"",
            "\"Революция красных гвоздик\""
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Укажите год начала Первой мировой войны",
        "options": [
            "1911 г",
            "1914 г",
            "1905 г",
            "1919 г"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Поход Наполеона против России начался в:",
        "options": [
            "1812 г",
            "1807 г",
            "1811 г",
            "1810 г"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Первой базой китайской революции 1925-1927 гг. явилась провинция:",
        "options": [
            "Гуандун",
            "Шэньси",
            "Нинся",
            "Цзянси"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Государство Делийский султанат образовалось:",
        "options": [
            "В начале XVIII века",
            "В начале XVI века",
            "В конце XV века",
            "В начале XIII века"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Массовые выступления студентов в Китае в 1989 г. на площади Тяньаньмэнь проходили под лозунгами:",
        "options": [
            "Демократизации общества",
            "В поддержку проводимых реформ",
            "Защиты идей Мао Цзэдуна",
            "Территориальных претензий к СССР"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Какое величайшее открытие связано с именем Иоганна Гутенберга:",
        "options": [
            "Книгопечатание",
            "Лекарственные свойства растений, изготовление лекарств",
            "Открытие пороха",
            "Изучение свойств металлов"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Событие, предшествовавшее 4 сентября 1870 г. во Франции:",
        "options": [
            "Бегство императора за границу",
            "Франко-прусская война",
            "Взятие Бастилии",
            "Парижская Коммуна"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "По реформе государственного управления Петра I горной промышленностью заведовала:",
        "options": [
            "Мануфактур-коллегия",
            "Ревизион-коллегия",
            "Камер-коллегия",
            "Берг-коллегия"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Объединение ФРГ и ГДР произошло в:",
        "options": [
            "1985 г",
            "1990 г",
            "1961 г",
            "1945 г"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Ашшурбанипал хранил в своем дворце:",
        "options": [
            "Драгоценные камни",
            "Глиняную библиотеку",
            "Сокровищницу с золотой и серебряной посудой",
            "Коллекцию железных мечей"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Столицей тайпинского восстания стал город:",
        "options": [
            "Шанхай",
            "Нанкин",
            "Гонконг",
            "Пекин"
        ],
        "answer": 1,
        "type": "single"
    },
    {
        "question": "Фашистский блок полностью распался:",
        "options": [
            "Весной 1945 года",
            "В конце 1944 года",
            "В начале 1945 года",
            "В начале 1944 года"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "Какие горы отделяют Индию от других стран?",
        "options": [
            "Гималаи",
            "Тибет",
            "Кавказ",
            "Памир"
        ],
        "answer": 0,
        "type": "single"
    },
    {
        "question": "Советские войска были введены на территорию Латвии, Литвы и Эстонии в:",
        "options": [
            "1941 г",
            "1939 г",
            "1938 г",
            "1940 г"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "Реконверсия это:",
        "options": [
            "Антивоенное движение",
            "Создание военно-промышленного комплекса",
            "Перевод экономики на военный лад",
            "Переход к мирной жизни"
        ],
        "answer": 3,
        "type": "single"
    },
    {
        "question": "После первой мировой войны страны-победительницы не пригласили на конференции по вопросам международных отношений бывшего союзника:",
        "options": [
            "США",
            "Россия",
            "Германию",
            "Турцию"
        ],
        "answer": 2,
        "type": "single"
    },
    {
        "question": "В середине XIX в. на базе английской партии тори сложилась партия:",
        "options": [
            "Консервативная",
            "Республиканская",
            "Лейбористская",
            "Либеральная"
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















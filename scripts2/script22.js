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
            "question": "В годы правления Навуходоносора это город был известен в мире как самый красивый и могущественный. О каком городе идет речь?",
            "options": [
                "Аккад",
                "Вавилон ",
                "Шумер",
                "Мемфис"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Крупнейший государственный деятель, правитель, умный и энергичный царь, основатель Македонского государства, создатель боеспособной Македонской армии.",
            "options": [
                "Филипп II ",
                "Клисфен",
                "Дарий I",
                "Александр Македонский"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Полис в древней Греции – это",
            "options": [
                "Земельный надел",
                "Страховой агент",
                "Город-государство",
                "Провинция"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "В 27 году до н.э. Октавиан создал Римскую империю, которая распалась в 395 году после смерти императора Феодосия. Рассчитайте продолжительность существования Римской империи.",
            "options": [
                "366",
                "422",
                "400",
                "425"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "На территории какого современного государства существовало государство Урарту?",
            "options": [
                "Армения",
                "Иран",
                "Турция",
                "Грузия"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Золотая Орда была создана в",
            "options": [
                "1243 году",
                "1227 году",
                "1245 году",
                "1242 году"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Основатель алгебраической науки, названный «Отцом алгоритма», его наиболее значительный труд называется «Китаб аль-джабр ва мукабаа»",
            "options": [
                "Абу Райхан Бируни",
                "Аристотель",
                "Аль –Хорезми",
                "Фирдоуси"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "Органы сословного представительства в Испании и Португалии в эпоху феодализма именовались",
            "options": [
                "Сейм",
                "Парламент",
                "Кортес",
                "Генеральные штаты"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "Мореплаватель Америго Веспучи, доказавший, что открытые Колумбом земли – новый материк, выступал от страны",
            "options": [
                "Испании",
                "Италии",
                "Англии",
                "Голландии"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "О столице какого государства идет речь в данном повествовании? «… В старину на берегу реки Днепр жили три брата и их сестра из племени полян. Старший брат Кий, его младшие братья Щек, Хорив и сестра Лебедь вели торговлю с соседними племенами. Они построили город на берегу Днепра и назвали его именем старшего из братьев…»",
            "options": [
                "Римской империи",
                "Киевской Руси",
                "Франкской империи",
                "Византийской империи"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Первой страной, где произошла первая буржуазная революция стала(и)",
            "options": [
                "Нидерланды",
                "США",
                "Франция",
                "Россия"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Декларация Независимости, провозгласившей США, была принята в",
            "options": [
                "1779",
                "1776",
                "1783",
                "1778"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Русский царь, подписавший манифест об отмене крепостного права, Положения о новом устройстве крестьян",
            "options": [
                "Николай II",
                "Александр II",
                "Петр I",
                "Иван Грозный"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Одним из результатов \"опиумных войн\" середины XIX века стал",
            "options": [
                "в Китае сменилась правящая династия",
                "Китай добился независимости от европейских государств",
                "произошло насильственное \"открытие\" Китая",
                "произошло восстание ихетуаней"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "Правление какого султана называют эпохой «Зюлим»?",
            "options": [
                "Абдул Азиз",
                "Махмуд II",
                "Мустафа Решид Паша",
                "Абдулла Хамид II"
            ],
            "answer": 3,
            "type": "single"
        },
        {
            "question": "Формула «2+4» стала предметом переговоров по определению международно-правового статуса государства",
            "options": [
                "Франции",
                "Испании",
                "Германии",
                "Великобритании"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "О каком событии Великой Отечественной войны идет речь",
            "options": [
                "Сталинградская битва",
                "Битва под Москвой",
                "Битва за Днепр",
                "Курская битва"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "От даты начала сплошной коллективизации в СССР отнять дату начала НЭПа. Полученное число прибавьте к году отречения Николая ІІ от престола. Какое событие в истории СССР обозначает полученная дата?",
            "options": [
                "1961 – полет Ю.Гагарина в космос",
                "1922 – образование СССР",
                "1925 – начало индустриализации",
                "1956 – XX съезд КПСС"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "В ХХ веке было изобретено самое разрушительное оружие в истории:",
            "options": [
                "Химическое",
                "Атомное",
                "Биологическое",
                "Газовое"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Автор труда «Закат Европы»",
            "options": [
                "О.Шпенглер",
                "Ф.Аквинский",
                "К.Ясперс",
                "А.Камю"
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















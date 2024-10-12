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
            "question": "Какая реформа была проведена в Англии в 1215 году и ограничила власть короля?",
            "options": [
                "Введение парламента",
                "Подписание Великой хартии вольностей ",
                "Учреждение конституции",
                "Принятие Билля о правах"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какое государство впервые применило концепцию демократии в античности?",
            "options": [
                "Древний Египет",
                "Древняя Греция ",
                "Вавилон",
                "Древний Рим"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какое событие завершило эпоху Средневековья в Европе?",
            "options": [
                "Открытие Америки ",
                "Восстание Спартака",
                "Падение Византийской империи",
                "Начало Ренессанса"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Кто из европейских исследователей впервые открыл морской путь в Индию в конце XV века?",
            "options": [
                "Христофор Колумб",
                "Васко да Гама ",
                "Фернан Магеллан",
                "Джеймс Кук"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какое событие послужило началом Второй мировой войны?",
            "options": [
                "Оккупация Чехословакии",
                "Нападение на Польшу ",
                "Операция 'Барбаросса'",
                "Бомбардировка Перл-Харбора"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Кто из этих деятелей был лидером Боливарианского движения за независимость в Южной Америке?",
            "options": [
                "Симон Боливар ",
                "Мигель Идальго",
                "Хосе де Сан-Мартин",
                "Франсиско Миранда"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Какая экономическая теория развилась в XVI-XVII веках и основывалась на идее накопления золота и серебра?",
            "options": [
                "Социализм",
                "Меркантилизм ",
                "Феодализм",
                "Капитализм"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Кто был первым императором Китая и основателем династии Цинь?",
            "options": [
                "Чжоу Вэнь-ван",
                "Цинь Шихуанди ",
                "Хан Гао-цзу",
                "Тан Тай-цзун"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какой мирный договор положил конец Тридцатилетней войне в Европе?",
            "options": [
                "Нантский эдикт",
                "Вестфальский мир ",
                "Утрехтский договор",
                "Константинопольский договор"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какое политическое событие привело к установлению нацистского режима в Германии?",
            "options": [
                "Октябрьская революция",
                "Веймарская конституция",
                "Назначение Гитлера канцлером ",
                "Версальский договор"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "Кто был лидером Франции во время Французской революции?",
            "options": [
                "Робеспьер ",
                "Людовик XVI",
                "Наполеон Бонапарт",
                "Жан-Поль Марат"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Какое государство было основным соперником Рима во время Пунических войн?",
            "options": [
                "Македония",
                "Персия",
                "Карфаген ",
                "Египет"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "Кто из правителей ввел доктрину 'железной крови' и объединил Германию в 1871 году?",
            "options": [
                "Отто фон Бисмарк ",
                "Вильгельм I",
                "Фридрих Великий",
                "Наполеон III"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Какое государство распалось в результате Первой мировой войны?",
            "options": [
                "Османская империя ",
                "Великобритания",
                "Китай",
                "Испания"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Какое изобретение Гутенберга способствовало распространению идей Реформации?",
            "options": [
                "Печать ",
                "Порох",
                "Компас",
                "Телескоп"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Кто первым совершил кругосветное плавание в 1519-1522 годах?",
            "options": [
                "Фернан Магеллан ",
                "Джеймс Кук",
                "Христофор Колумб",
                "Васко да Гама"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Какой город был столицей Византийской империи?",
            "options": [
                "Рим",
                "Константинополь ",
                "Александрия",
                "Афины"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какое движение возникло в результате промышленной революции и выступало за улучшение условий труда рабочих?",
            "options": [
                "Анархизм",
                "Социализм ",
                "Империализм",
                "Либерализм"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какое государство считалось родиной Ренессанса?",
            "options": [
                "Франция",
                "Англия",
                "Италия ",
                "Испания"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "Кто стал лидером Советского Союза после смерти Ленина в 1924 году?",
            "options": [
                "Иосиф Сталин ",
                "Лев Троцкий",
                "Владимир Ленин",
                "Никита Хрущев"
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















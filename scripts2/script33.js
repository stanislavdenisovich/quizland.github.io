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
            "question": "Какой древний правитель построил висячие сады Вавилона, одно из семи чудес света?",
            "options": [
                "Хаммурапи",
                "Навуходоносор II ",
                "Дарий I",
                "Цезарь"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какое государство считается первым в истории человечества?",
            "options": [
                "Вавилон",
                "Древний Египет",
                "Шумер ",
                "Финикия"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "Какое событие положило конец Римской республике и привело к установлению империи?",
            "options": [
                "Восстание Спартака",
                "Гражданская война",
                "Назначение Октавиана Августа императором ",
                "Падение Карфагена"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "В каком году началась Столетняя война между Англией и Францией?",
            "options": [
                "1325",
                "1337 ",
                "1340",
                "1367"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какой правитель объединил Германию в 1871 году?",
            "options": [
                "Вильгельм I ",
                "Бисмарк",
                "Фридрих II",
                "Наполеон III"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Кто был главным противником Наполеона в битве при Ватерлоо в 1815 году?",
            "options": [
                "Веллингтон ",
                "Царь Александр I",
                "Фридрих Вильгельм III",
                "Франц I"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Какая страна первой начала промышленную революцию в XVIII веке?",
            "options": [
                "Германия",
                "Франция",
                "Великобритания ",
                "США"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "Какая страна стала первой буржуазной республикой в результате революции в XVII веке?",
            "options": [
                "Франция",
                "США",
                "Англия ",
                "Нидерланды"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "Какая организация была создана в 1945 году для предотвращения мировых войн?",
            "options": [
                "Лига Наций",
                "Организация Объединенных Наций ",
                "Варшавский договор",
                "НАТО"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какое событие стало началом Великой Французской революции в 1789 году?",
            "options": [
                "Взятие Бастилии ",
                "Казнь Людовика XVI",
                "Создание Генеральных штатов",
                "Учреждение Национального собрания"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Кто был лидером американской войны за независимость и первым президентом США?",
            "options": [
                "Джон Адамс",
                "Бенджамин Франклин",
                "Томас Джефферсон",
                "Джордж Вашингтон "
            ],
            "answer": 3,
            "type": "single"
        },
        {
            "question": "Какой договор положил конец Первой мировой войне в 1919 году?",
            "options": [
                "Венский договор",
                "Версальский договор ",
                "Брест-Литовский договор",
                "Лондонский пакт"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Кто был первым королем объединенной Италии в 1861 году?",
            "options": [
                "Джузеппе Гарибальди",
                "Виктор Эммануил II ",
                "Наполеон III",
                "Камилло Кавур"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какая империя распалась после Первой мировой войны?",
            "options": [
                "Британская",
                "Османская ",
                "Римская",
                "Французская"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какой документ подписал Мартин Лютер в 1517 году, положивший начало Реформации?",
            "options": [
                "95 тезисов ",
                "Аугсбургский мир",
                "Вестфальский договор",
                "Эдикт Нанта"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Какое событие привело к началу Первой мировой войны в 1914 году?",
            "options": [
                "Взятие Парижа",
                "Убийство эрцгерцога Франца Фердинанда ",
                "Нападение на Польшу",
                "Распад Австро-Венгрии"
            ],
            "answer": 1,
            "type": "single"
        },
        {
            "question": "Какое государство лидировало в открытии морских путей в конце XV века?",
            "options": [
                "Португалия ",
                "Испания",
                "Англия",
                "Франция"
            ],
            "answer": 0,
            "type": "single"
        },
        {
            "question": "Кто написал труд «Происхождение видов» и заложил основы теории эволюции?",
            "options": [
                "Жан-Батист Ламарк",
                "Грегор Мендель",
                "Чарльз Дарвин ",
                "Исаак Ньютон"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "Какая мировая держава первой достигла космоса, запустив спутник в 1957 году?",
            "options": [
                "США",
                "Великобритания",
                "СССР ",
                "Франция"
            ],
            "answer": 2,
            "type": "single"
        },
        {
            "question": "Какой монарх провел политику западнизации России в начале XVIII века?",
            "options": [
                "Иван IV",
                "Петр I ",
                "Екатерина II",
                "Николай II"
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















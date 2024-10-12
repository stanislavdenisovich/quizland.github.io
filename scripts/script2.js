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
        question: "Создание партии «Алаш».",
        options: ["1916 г.", "1917 г., июль", "1917 г., декабрь", "1919 ж. 10 июля."],
        answer: 1,
        type: "single"
    },
    {
        question: "Образование правительства Алаш-Орда.",
        options: [ "1916 г.", "1920 г.", "1917 г., июль","1917 г., декабрь"],
        answer: 3,
        type: "single"
    },
    {
        question: "Создан Революционный Комитет по управлению казахским (киргизским) краем.",
        options: [ "1925 г.", "1936 г.","1919 ж. 10 июля", "1920 г."],
        answer: 2,
        type: "single"
    },
    {
        question: "Образование Киргизской (Казахской) АССР.",
        options: ["1920 г.", "1917 г., декабрь", "1937–1938 гг.", "1936 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "V съезд Советов Казахстана и восстановление исторического названия казахского народа.",
        options: ["1925 г., апрель", "1937 г.", "1936 г.", "1916 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Перенос столицы КазАССР из Оренбурга в г. Кзыл-Орду.",
        options: [ "1928 г.","1925 г.", "1936 г.", "1937–1938 гг."],
        answer: 1,
        type: "single"
    },
    {
        question: "Выступление певца А.Кашаубаева на Всемирной выставке в Париже.",
        options: [ "1936 г.", "1917 г., декабрь", "1931–1932/1933 гг.","1925 г."],
        answer: 3,
        type: "single"
    },
    {
        question: "Открытие первого вуза – Казахского государственного педагогического института.",
        options: [ "1925 г.","1928 г.", "1936 г.", "1916 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Перенос столицы Казахской АССР из г. Кзыл-Орды в г. Алма-Ату.",
        options: [ "1925 г.", "1928 г.","1929 г.", "1931–1932/1933 гг."],
        answer: 2,
        type: "single"
    },
    {
        question: "Массовый голод в годы насильственной коллективизации.",
        options: [ "1937–1938 гг.", "1929 г.","1931–1932/1933 гг.", "1936 г."],
        answer: 2,
        type: "single"
    },
    {
        question: "Преобразование КАССР в союзную (КазССР) республику.",
        options: [ "1931–1932/1933 гг.","1936 г.", "1937 г.", "1946 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Годы массовых репрессий.",
        options: ["1937–1938 гг.", "1936 г.", "1925 г.", "1919 ж. 10 июля."],
        answer: 0,
        type: "single"
    },
    {
        question: "Принятие Конституции Казахской ССР.",
        options: [ "1936 г.", "1925 г.", "1946 г.","1937 г."],
        answer: 3,
        type: "single"
    },
    {
        question: "Начало Второй мировой войны.",
        options: ["1939 г.", "1936 г.", "1937 г.", "1946 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Образование Академии наук Казахской ССР.",
        options: ["1946 г.", "1939 г.", "1949 г.", "1954 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Первый наземный атомный взрыв на Семипалатинском ядерном полигоне.",
        options: [ "1937 г.","1949 г.", "1946 г.", "1954 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Присуждение Государственной премии СССР М.Ауэзову за роман «Абай».",
        options: ["1949 г.", "1954 г.", "1946 г.", "1959 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Начало освоения целинных и залежных земель.",
        options: [ "1949 г.", "1962–1964 гг.","1954 г.", "1961 г."],
        answer: 2,
        type: "single"
    },
    {
        question: "Полёт первого космонавта Ю.Гагарина.",
        options: [ "1959 г.", "1962–1964 гг.", "1963 г.","1961 г."],
        answer: 3,
        type: "single"
    },
    {
        question: "Договор о запрещении ядерных испытаний в атмосфере, космосе и под водой.",
        options: ["1963 г.", "1954 г.", "1949 г.", "1959 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Годы руководства КазССР Кунаевым",
        options: ["1961-1962, 1964-1987 гг.", "1920-1942, 1964-1976 гг.", "1960-1962, 1964-1986 гг.", "1950-1962, 1964-1986 гг."],
        answer: 2,
        type: "single"
    },
    {
        question: "Открытие «Золотого человека» в кургане Иссык.",
        options: ["1969 г.", "1979 г.", "1986 г.", "1988 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Принятие Конституции Казахской ССР.",
        options: [ "1969 г.","1978 г.", "1991 г., 1 декабря", "1986 г."],
        answer: 1,
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















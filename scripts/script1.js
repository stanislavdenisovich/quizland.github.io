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
        question: "Период государства Могулистан",
        options: ["Середина 14 -начало 16 вв.", "Начало 14 -начало 15 вв.", "Конец 12 -начало 15 вв.", "Середина 15 -начало 17 вв."],
        answer: 0, 
        type: "single"
    },
    {
        question: "Время правления хана Хакназара.",
        options: [ "1582/1583–1598 гг.", "1428–1468 гг.", "1726–1728 гг.","1538–1580 гг."],
        answer: 3, 
        type: "single"
    },
    {
        question: "Время правления хана Таукея.",
        options: [ "1680–1715/1718 гг.","1582/1583–1598 гг.", "1643 г.", "1726–1728 гг."],
        answer: 1, 
        type: "single"
    },
    {
        question: "Создание свода законов «Жеты-Жаргы».",
        options: ["Конец 16 -начало 17 вв.", "Время правления хана Таукея.", "1680–1715/1718 гг.", "1643 г."],
        answer: 0, 
        type: "single"
    },
    {
        question: "Начало «Актабан шубырынды, Алкаколь сулама».",
        options: [ "1643 г.", "1428–1468 гг.", "1723 г.","1680–1715/1718 гг."],
        answer: 2, 
        type: "single"
    },
    {
        question: "Булатинская битва",
        options: ["1643 г.", "1723 г.", "1726/1728 гг.", "1582/1583–1598 гг."],
        answer: 2, 
        type: "single"
    },
    {
        question: "Аныракайская битва.",
        options: ["1729/1730 гг.", "1428–1468 гг.", "1538–1580 гг.", "1582/1583–1598 гг."],
        answer: 0, 
        type: "single"
    },
    {
        question: "Годы правления Нуралы хана",
        options: ["1729/1730 гг.", "1428–1468 гг.", "1748–1786 гг.", "1582/1583–1598 гг."],
        answer: 2, 
        type: "single"
    },
    {
        question: "Время правления Абылая.",
        options: [ "1802–1847 гг.", "1538–1580 гг.", "1680–1715/1718 гг.","1771–1781 гг."],
        answer: 3, 
        type: "single"
    },
    {
        question: "Годы восстания под руководством Сырыма Датулы.",
        options: ["1802–1847 гг.", "1773–1775 гг.", "1783–1797 гг.", "1726/1728 гг."],
        answer: 2, 
        type: "single"
    },
    {
        question: "Годы жизни хана Кенесары Касымулы.",
        options: ["1723 г.", "1726/1728 гг.", "1802–1847 гг.", "1783–1797 гг."],
        answer: 2, 
        type: "single"
    },
    {
        question: "Годы жизни Шокана Уалиханова.",
        options: ["1837–1847 гг.", "1835–1865 гг.", "1841–1889 гг.", "1845–1904 гг."],
        answer: 1,
        type: "single"
    },
    {
        question: "Восстание под руководством Кенесары Касымулы.",
        options: ["1835–1865 гг.", "1837–1847 гг.", "1841–1889 гг.", "1845–1904 гг."],
        answer: 1,
        type: "single"
    },
    {
        question: "Годы жизни Ибрая Алтынсарина.",
        options: ["1835–1865 гг.", "1841–1889 гг.", "1837–1847 гг.", "1845–1904 гг."],
        answer: 1,
        type: "single"
    },
    {
        question: "Годы жизни Абая Кунанбаева.",
        options: ["1845–1904 гг.", "1835–1865 гг.", "1841–1889 гг.", "1858–1931 гг."],
        answer: 0,
        type: "single"
    },
    {
        question: "Период восстания Жанқожи Нурмухамбетулы против царской России.",
        options: [ "1835–1865 гг.", "1845–1904 гг.", "1916 г.","XIX в. 50 гг."],
        answer: 3,
        type: "single"
    },
    {
        question: "Годы жизни Шакарима Кудайбердулы.",
        options: ["1835–1865 гг.", "1858–1931 гг.", "1913–1918 гг.", "1841–1889 гг."],
        answer: 1,
        type: "single"
    },
    {
        question: "Годы жизни Алихана Букейхана.",
        options: ["1866–1937 гг.", "1858–1931 гг.", "1845–1904 гг.", "1837–1847 гг."],
        answer: 0,
        type: "single"
    },
    {
        question: "Раскрытие В. Томсеном тайн древнетюркской письменности.",
        options: ["1916 г.", "1845–1904 гг.", "1893 г.", "1866–1937 гг."],
        answer: 2,
        type: "single"
    },
    {
        question: "Издание общеказахской газеты «Казах».",
        options: [ "1917 г., июль", "1916 г.", "1845–1904 гг.","1913–1918 гг."],
        answer: 3,
        type: "single"
    },
    {
        question: "Национально-освободительное движение в Казахстане и Средней Азии.",
        options: ["1916 г.", "1917 г., июль", "1913–1918 гг.", "1866–1937 гг."],
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















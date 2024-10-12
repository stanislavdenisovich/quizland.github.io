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
        question: "Демонстрации в Целинограде против создания немецкой автономии в Казахстане.",
        options: [ "1991 г., 1 декабря", "1988 г.", "1995 г.","1979 г."],
        answer: 3,
        type: "single"
    },
    {
        question: "Декабрьские события.",
        options: [ "1989 г.", "1991 г.","1986 г.", "1979 г."],
        answer: 2,
        type: "single"
    },
    {
        question: "Реабилитация деятелей «Алаш» Ш. Кудайбердиева, А. Байтурсунова, М. Жумабаева, Х. Аймаутова, М. Дулатова.",
        options: ["1988 г.", "1986 г.", "1991 г.", "1992 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Забастовка шахтеров Караганды.",
        options: [ "1991 г., 16 декабря","1989 г.", "1991 г., 1 декабря", "1995 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Создание экологического движения «Невада-Семипалатинск».",
        options: [ "1992 г.","1989 г.", "1995 г.", "1991 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Принятие «Закона Казахской ССР о языке», государственным объявлен казахский язык.",
        options: ["1989 г.", "1991 г.", "1993 г.", "1995 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Принятие Декларации о государственной суверенитет КазССР.",
        options: [ "1995 г., 30 август", "1991 г., 16 декабря","1990 г., 25 октября", "1989 г."],
        answer: 2,
        type: "single"
    },
    {
        question: "Указ Н.А. Назарбаева о закрытии Семипалатинского ядерного полигона.",
        options: ["1991 г., 29 август", "1990 г.", "1991 г.", "1986 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Избрание Н.А. Назарбаева Президентом Казахстана на всенародных выборах.",
        options: [ "1991 г., 29 август","1991 г., 1 декабря", "1991 г., 16 декабря", "1995 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Принятие Конституционного Закона Республики Казахстан «О государственной независимости».",
        options: [ "1991 г.","1991 г., 16 декабря", "1990 г., 25 октября", "1992 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Первый Всемирный курултай казахов (г. Алматы).",
        options: [ "1991 г.", "1995 г.", "1993 г.","1992 г."],
        answer: 3,
        type: "single"
    },
    {
        question: "Утверждение государственных символов: Флага, Герба и Гимна.",
        options: ["1992 г., июнь", "1991 г., 1 декабря", "1995 г.", "1997 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Вступление Республики Казахстан в ООН в качестве полноправного члена.",
        options: [ "1993 г.", "1995 г.", "1991 г.","1992 г."],
        answer: 3,
        type: "single"
    },
    {
        question: "Введение национальной валюты Республики Казахстан – тенге.",
        options: ["1993 г., ноябрь", "1992 г.", "1995 г.", "1997 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Создание Ассамблеи народа Казахстана.",
        options: [ "1995 г., 30 август", "1997 г.","1995 г.", "1991 г."],
        answer: 2,
        type: "single"
    },
    {
        question: "Принятие на всенародном референдуме Конституции Республики Казахстан.",
        options: [ "1995 г.","1995 г., 30 август", "1992 г.", "1991 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Год общенационального согласия и памяти жертв политических репрессий.",
        options: ["1997 г.", "1995 г.", "1993 г.", "1992 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Перенос столицы Республики Казахстан из города Алматы в город Акмола.",
        options: ["1997 г.", "1991 г.", "1995 г.", "1999 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Решением ЮНЕСКО город Астана признан обладателем звания «Город мира».",
        options: [ "1997 г.", "1995 г.", "1991 г.","1999 г."],
        answer: 3,
        type: "single"
    },
    {
        question: "В Астане состоялся I-й съезд лидеров традиционных религий мира.",
        options: [ "1999 г.", "1997 г.", "2010 г.","2003 г."],
        answer: 3,
        type: "single"
    },
    {
        question: "Казахстан – председатель ОБСЕ.",
        options: ["2010 г.", "2003 г.", "1999 г.", "1997 г."],
        answer: 0,
        type: "single"
    },
    {
        question: "Проведение Азиады в Казахстане.",
        options: [ "2010 г.","2011 г.", "2012 г.", "2019 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Проведение в Казахстане международной выставки ЭКСПО-2017.",
        options: [ "2011 г.","2017 г.", "2019 г.", "2010 г."],
        answer: 1,
        type: "single"
    },
    {
        question: "Избрание Президентом Республики Казахстан Касым-Жомарта Токаева.",
        options: ["2019 г.", "2017 г.", "2011 г.", "2010 г."],
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















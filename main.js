const Phrases = [
    "Вы уже на пути к своей цели — просто продолжайте идти.",
    "Каждое утро — это новая возможность начать сначала.",
    "Ваши усилия не напрасны — результат обязательно придёт.",
    "Не сравнивайте себя с другими — у вас свой уникальный путь.",
    "Маленькие шаги каждый день ведут к большим переменам.",
    "Вы сильнее, чем думаешь, и способны на большее, чем представляете.",
    "Ошибки — это не провал, а уроки на пути к успеху.",
    "Сегодня вы стали сильнее, чем были вчера.",
    "Вера в себя — это та магия, которая запускает чудеса.",
    "Ваш потенциал безграничен, просто позвольте себе сиять."
]

const phraseElement = document.querySelector('.phrase');

const buttonElement = document.querySelector('.genphrase');

function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * Phrases.length);
    return Phrases[randomIndex];
}

function updatePhrase() {
    const newPhrase = getRandomPhrase();
    phraseElement.textContent = newPhrase;
}

buttonElement.addEventListener('click', updatePhrase);

const TopBtn = document.getElementById("TopBtn");

window.addEventListener("scroll", function() {
    if (window.scrollY > 500) {
        TopBtn.style.display = "block";
    } else {
        TopBtn.style.display = "none";
    }
});

TopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"  
    });
});

function saveUserName(name) {
    if (name && name.trim() !== '') {
        localStorage.setItem('userName', name.trim());
    }
}

function loadUserName() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        const userNameInput = document.querySelector('.user');
        if (userNameInput) {
            userNameInput.value = savedName;
        }
        return savedName;
    }
    return '';
}

document.addEventListener('DOMContentLoaded', () => {
    loadUserName();
});

const userNameField = document.querySelector('.user');
if (userNameField) {
    userNameField.addEventListener('blur', () => {
        const name = userNameField.value.trim();
        if (name) {
            saveUserName(name);
        }
    });
    
    userNameField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const name = userNameField.value.trim();
            if (name) {
                saveUserName(name);
            }
        }
    });
}

const questions = [
    {
        text: "Как часто вы чувствуете усталость и отсутствие энергии?",
        options: [
            "Почти никогда",
            "Иногда, но быстро восстанавливаюсь",
            "Достаточно часто",
            "Постоянно чувствую себя обессиленным"
        ],
        scores: [4, 3, 2, 1]
    },
    {
        text: "Как вы оцениваете качество вашего сна?",
        options: [
            "Отличное, просыпаюсь отдохнувшим",
            "Хорошее, но иногда просыпаюсь ночью",
            "Удовлетворительное, часто не высыпаюсь",
            "Плохое, бессонница или прерывистый сон"
        ],
        scores: [4, 3, 2, 1]
    },
    {
        text: "Как часто вы испытываете тревогу или беспокойство без причины?",
        options: [
            "Почти никогда",
            "Редко",
            "Достаточно часто",
            "Постоянно в напряжении"
        ],
        scores: [4, 3, 2, 1]
    },
    {
        text: "Насколько легко вам сосредоточиться на работе или учёбе?",
        options: [
            "Очень легко, ничего не отвлекает",
            "Довольно легко, но иногда отвлекаюсь",
            "Сложно, часто отвлекаюсь",
            "Очень трудно сосредоточиться"
        ],
        scores: [4, 3, 2, 1]
    },
    {
        text: "Как часто вы чувствуете радость и удовлетворение от жизни?",
        options: [
            "Почти каждый день",
            "Несколько раз в неделю",
            "Редко",
            "Почти никогда"
        ],
        scores: [4, 3, 2, 1]
    }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let userName = '';

const modal = document.getElementById('testModal');
const testBtn = document.querySelector('.testbtn');
const modalBody = document.getElementById('modalBody');
const modalFooter = document.getElementById('modalFooter');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const closeModal = document.querySelector('.close-modal');

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Вопрос ${currentQuestionIndex + 1} из ${questions.length}`;
}

function renderCurrentQuestion() {
    const question = questions[currentQuestionIndex];
    const selectedOption = userAnswers[currentQuestionIndex];
    
    let optionsHtml = '';
    question.options.forEach((option, index) => {
        const isSelected = selectedOption === index;
        const prefix = index + 1;
        optionsHtml += `
            <div class="option ${isSelected ? 'selected' : ''}" data-option-index="${index}">
                <div class="option-prefix">${prefix}</div>
                <div class="option-text">${option}</div>
            </div>
        `;
    });
    
    modalBody.innerHTML = `
        <div class="question-text">${question.text}</div>
        <div class="options-list">
            ${optionsHtml}
        </div>
    `;
    
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', (e) => {
            const optionElement = option.classList.contains('option') ? option : option.closest('.option');
            const optionIndex = parseInt(optionElement.dataset.optionIndex);
            userAnswers[currentQuestionIndex] = optionIndex;
            renderCurrentQuestion();
        });
    });
    
    renderButtons();
}

function renderButtons() {
    let buttonsHtml = '';
    
    if (currentQuestionIndex > 0) {
        buttonsHtml += `<button class="nav-btn prev-btn" id="prevBtn">← Назад</button>`;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
        buttonsHtml += `<button class="nav-btn next-btn" id="nextBtn" ${userAnswers[currentQuestionIndex] === null ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>Далее →</button>`;
    } else {
        buttonsHtml += `<button class="nav-btn submit-btn" id="submitBtn" ${userAnswers[currentQuestionIndex] === null ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>Завершить тест</button>`;
    }
    
    modalFooter.innerHTML = buttonsHtml;
    
    if (currentQuestionIndex > 0) {
        document.getElementById('prevBtn')?.addEventListener('click', goToPrevQuestion);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
        document.getElementById('nextBtn')?.addEventListener('click', goToNextQuestion);
    } else {
        document.getElementById('submitBtn')?.addEventListener('click', showResults);
    }
}

function goToNextQuestion() {
    if (userAnswers[currentQuestionIndex] !== null) {
        currentQuestionIndex++;
        updateProgress();
        renderCurrentQuestion();
    }
}

function goToPrevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateProgress();
        renderCurrentQuestion();
    }
}

function calculateResult() {
    let totalScore = 0;
    let maxScore = questions.length * 4;
    
    for (let i = 0; i < questions.length; i++) {
        const answerIndex = userAnswers[i];
        if (answerIndex !== null) {
            totalScore += questions[i].scores[answerIndex];
        }
    }
    
    const percentage = (totalScore / maxScore) * 100;
    return { totalScore, maxScore, percentage };
}

function showResults() {
    if (userAnswers[currentQuestionIndex] === null) {
        return;
    }
    
    const { percentage } = calculateResult();
    const storedName = localStorage.getItem('userName');
    const userNameText = storedName || userName || 'Уважаемый пользователь';
    
    let resultMessage = '';
    let resultDescription = '';
    
    if (percentage >= 80) {
        resultMessage = 'Отличное состояние!';
        resultDescription = 'Ваше ментальное здоровье в прекрасном состоянии. Вы хорошо справляетесь со стрессом и умеете радоваться жизни. Продолжайте в том же духе! Практики помогут вам поддерживать этот баланс.';
    } else if (percentage >= 60) {
        resultMessage = 'Хорошее состояние';
        resultDescription = 'У вас хороший уровень ментального здоровья, но есть небольшие зоны для роста. Наши практики помогут вам укрепить эмоциональную устойчивость и улучшить качество жизни.';
    } else if (percentage >= 40) {
        resultMessage = 'Требуется внимание';
        resultDescription = 'Ваше состояние говорит о том, что стоит уделить больше внимания себе. Не переживайте, это нормально — у всех бывают трудные периоды. Наши практики помогут вам восстановить внутреннюю гармонию.';
    } else {
        resultMessage = 'Нужна поддержка';
        resultDescription = 'Вы проходите через непростой период. Важно помнить: вы не одни, и просить помощи — это нормально. Практики на нашем сайте помогут вам начать путь к восстановлению. Также рекомендуем обратиться к специалисту.';
    }
    
    modalBody.innerHTML = `
        <div class="result-container">
            <div class="result-score">${Math.round(percentage)}%</div>
            <div class="result-message">${userNameText}, ${resultMessage}</div>
            <div class="result-description">${resultDescription}</div>
            <button class="practice-btn" id="goToPracticeBtn">Перейти к практикам →</button>
            <button class="nav-btn restart-btn" id="restartTestBtn" style="margin-top: 15px;">Пройти тест заново</button>
        </div>
    `;
    
    modalFooter.innerHTML = '';
    
    document.getElementById('goToPracticeBtn')?.addEventListener('click', () => {
        window.location.href = 'practice.html';
    });
    
    document.getElementById('restartTestBtn')?.addEventListener('click', () => {
        resetTest();
        renderCurrentQuestion();
        updateProgress();
    });
}

function resetTest() {
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    updateProgress();
}

function openModal() {
    const savedName = localStorage.getItem('userName');
    const inputName = userNameField ? userNameField.value.trim() : '';
    
    userName = inputName || savedName || '';
    
    if (!userName) {
        alert('Пожалуйста, введите ваше имя');
        return;
    }
    
    if (inputName) {
        saveUserName(inputName);
    }
    
    resetTest();
    renderCurrentQuestion();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if (testBtn) {
    testBtn.addEventListener('click', openModal);
}
if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunc();
    }
});

const textBlocks = document.querySelectorAll('.description, .generate, .privilege, .test, .footer');

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('text-visible');
            textObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

textBlocks.forEach(block => {
    block.classList.add('text-hidden');
    textObserver.observe(block);
});

const fadeElements = document.querySelectorAll('.fade-on-scroll');

function checkVisibility() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
checkVisibility(); 
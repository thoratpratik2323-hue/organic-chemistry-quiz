const quizData = [
    {
        question: "Reaction of phenol with CHCl3/NaOH (Reimer-Tiemann) gives:",
        options: ["Salicylic acid", "Salicylaldehyde", "Benzaldehyde", "Benzoic acid"],
        correct: 1
    },
    {
        question: "Which of the following is most basic in gaseous phase?",
        options: ["NH3", "CH3NH2", "(CH3)2NH", "(CH3)3N"],
        correct: 3
    },
    {
        question: "The product of Hoffmann Bromamide Degradation of Benzamide is:",
        options: ["Benzylamine", "Aniline", "Nitrobenzene", "Benzenediazonium chloride"],
        correct: 1
    },
    {
        question: "Lucas reagent consists of:",
        options: ["conc. HCl + anhydrous ZnCl2", "conc. HNO3 + conc. H2SO4", "aq. KOH", "Br2 in CS2"],
        correct: 0
    },
    {
        question: "Which test distinguishes Aldehydes from Ketones?",
        options: ["Iodoform test", "Lucas test", "Tollens' reagent test", "Carbylamine test"],
        correct: 2
    },
    {
        question: "Gabriel Phthalimide synthesis is used to prepare:",
        options: ["1° Aliphatic amines", "1° Aromatic amines", "2° Amines", "3° Amines"],
        correct: 0
    },
    {
        question: "Which compound gives a positive Iodoform test?",
        options: ["Methanol", "Pentan-3-one", "Pentan-2-one", "Benzaldehyde"],
        correct: 2
    },
    {
        question: "Williamson's synthesis is a reaction to produce:",
        options: ["Alcohols", "Ethers", "Carboxylic acids", "Haloalkanes"],
        correct: 1
    },
    {
        question: "In DNA, the sugar moiety is:",
        options: ["Ribose", "2-Deoxyribose", "Fructose", "Glucose"],
        correct: 1
    },
    {
        question: "Nucleic acids are polymers of:",
        options: ["Amino acids", "Nucleotides", "Monosaccharides", "Fatty acids"],
        correct: 1
    },
    {
        question: "A peptide bond is formed between:",
        options: ["-CHO and -NH2", "-COOH and -NH2", "-COOH and -OH", "-OH and -NH2"],
        correct: 1
    },
    {
        question: "Reducing sugar among the following is:",
        options: ["Sucrose", "Lactose", "Starch", "Cellulose"],
        correct: 1
    },
    {
        question: "Carbylamine test is given only by:",
        options: ["2° amines", "1° amines", "3° amines", "Amides"],
        correct: 1
    },
    {
        question: "Heating alkyl halides with aq. KOH gives:",
        options: ["Alkenes", "Ethers", "Alcohols", "Aldehydes"],
        correct: 2
    },
    {
        question: "SN1 mechanism proceeds through the formation of:",
        options: ["Carbanion", "Free radical", "Carbocation", "Intermediate complex"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let canAnswer = true;

const startScreen = document.getElementById('start-screen');
const quizArea = document.getElementById('quiz-area');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const counterEl = document.getElementById('question-counter');
const progressEl = document.getElementById('progress');

function startQuiz() {
    startScreen.style.display = 'none';
    quizArea.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    canAnswer = true;
    const data = quizData[currentQuestion];
    questionEl.innerText = data.question;
    counterEl.innerText = `Question ${currentQuestion + 1}/${quizData.length}`;
    progressEl.style.width = `${((currentQuestion) / quizData.length) * 100}%`;

    optionsEl.innerHTML = '';
    data.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(idx, btn);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(idx, btn) {
    if (!canAnswer) return;
    canAnswer = false;

    const correctIdx = quizData[currentQuestion].correct;

    if (idx === correctIdx) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        optionsEl.children[correctIdx].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    quizArea.style.display = 'none';
    resultScreen.style.display = 'block';
    document.getElementById('final-score').innerText = score;

    const feedback = document.getElementById('feedback-msg');
    if (score === quizData.length) {
        feedback.innerText = "Perfect Score! You are an Organic Wizard! 🧙‍♀️";
        feedback.style.color = "#10b981";
    } else if (score > 10) {
        feedback.innerText = "Excellent Work! Just a few more revisions. 📚";
        feedback.style.color = "#8b5cf6";
    } else {
        feedback.innerText = "Keep practicing! You can do much better. 💪";
        feedback.style.color = "#f59e0b";
    }
}

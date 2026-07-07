// ข้อมูลผู้เล่น
let playerHp = 100;
let maxPlayerHp = 100;
let playerScore = 0;
let playerAttack = 10;

// ข้อมูลมอนสเตอร์
let monsterHp = 50;
let maxMonsterHp = 50;
let monsterDamage = 5;

// ข้อมูลโจทย์
let currentProblemIndex = 0;
const problems = [
    { imageUrl: 'testproblem1.png', answer: 8 }, // แก้ไขตรงนี้ให้ชื่อตรงกับรูป และคำตอบคือ 8
];
    // เพิ่มโจทย์ที่นี่

// ดึง element ต่างๆ
const playerHpSpan = document.getElementById('player-hp');
const playerScoreSpan = document.getElementById('player-score');
const monsterHpSpan = document.getElementById('monster-hp');
const monsterImage = document.getElementById('monster-image');
const problemImage = document.getElementById('problem-image');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const gameMessage = document.getElementById('game-message');

// ฟังก์ชันเริ่มต้นเกม
function startGame() {
    updateUi();
    showProblem();
}

// ฟังก์ชันอัปเดตหน้าจอ
function updateUi() {
    playerHpSpan.innerText = playerHp;
    playerScoreSpan.innerText = playerScore;
    monsterHpSpan.innerText = monsterHp;
}

// ฟังก์ชันแสดงโจทย์
function showProblem() {
    if (currentProblemIndex < problems.length) {
        problemImage.src = problems[currentProblemIndex].imageUrl;
        problemImage.style.display = 'block'; // แสดงรูปโจทย์
        answerInput.value = ''; // เคลียร์ช่องคำตอบ
    } else {
        problemImage.style.display = 'none'; // ซ่อนรูปโจทย์
        gameMessage.innerText = 'ชนะแล้ว! คุณผ่านด่านทั้งหมด!';
        answerInput.style.display = 'none'; // ซ่อนช่องคำตอบ
        submitButton.style.display = 'none'; // ซ่อนปุ่มโจมตี
    }
}

// ฟังก์ชันโจมตี
function attack() {
    const userAnswer = parseInt(answerInput.value);
    const correctAnswer = problems[currentProblemIndex].answer;

    if (userAnswer === correctAnswer) {
        // ตอบถูก โจมตีมอนสเตอร์
        monsterHp -= playerAttack;
        gameMessage.innerText = 'ถูกต้อง! คุณโจมตีมอนสเตอร์!';
        if (monsterHp <= 0) {
            // มอนสเตอร์ตาย
            gameMessage.innerText = 'คุณปราบมอนสเตอร์ได้!';
            playerScore += 10;
            currentProblemIndex++;
            spawnMonster(); // สุ่มมอนสเตอร์ตัวใหม่ (ถ้าต้องการ)
            showProblem();
        }
    } else {
        // ตอบผิด มอนสเตอร์โจมตี
        playerHp -= monsterDamage;
        gameMessage.innerText = 'ผิดแล้ว! มอนสเตอร์โจมตีคุณ!';
        if (playerHp <= 0) {
            // ผู้เล่นตาย
            gameMessage.innerText = 'Game Over! คะแนนของคุณ: ' + playerScore;
            answerInput.style.display = 'none'; // ซ่อนช่องคำตอบ
            submitButton.style.display = 'none'; // ซ่อนปุ่มโจมตี
        }
    }
    updateUi();
}

// ฟังก์ชันสุ่มมอนสเตอร์ (ตัวอย่างง่ายๆ)
function spawnMonster() {
    monsterHp = 50; // รีเซ็ต HP มอนสเตอร์
    monsterImage.src = 'testproblem1.png';// เปลี่ยนรูปมอนสเตอร์
}

// ผูกฟังก์ชันโจมตีกับปุ่ม
submitButton.addEventListener('click', attack);

// เริ่มเกม
startGame();

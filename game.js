// Game State Management
const GameState = {
    level: 1,
    xp: 0,
    coins: 50,
    xpThreshold: 100
};

// DOM Elements
const dom = {
    levelDisplay: null,
    xpBarFill: null,
    xpText: null,
    coinsDisplay: null,
    simulateBtn: null
};

// Initialize Game
function initGame() {
    loadProgress();
    
    // Cache DOM elements
    dom.levelDisplay = document.getElementById('level-display');
    dom.xpBarFill = document.getElementById('xp-bar-fill');
    dom.xpText = document.getElementById('xp-text');
    dom.coinsDisplay = document.getElementById('coins-display');
    dom.simulateBtn = document.getElementById('simulate-btn');

    // Initial UI Update
    updateUI();

    // Event Listeners
    if (dom.simulateBtn) {
        dom.simulateBtn.addEventListener('click', simulateLessonComplete);
    }
}

// Logic Functions
function addXP(amount) {
    GameState.xp += amount;
    
    // Level Up Logic
    while (GameState.xp >= GameState.xpThreshold) {
        GameState.xp -= GameState.xpThreshold;
        GameState.level++;
        alert(`🎉 Level Up! You are now Level ${GameState.level}!`);
    }
    
    saveProgress();
    updateUI();
}

function addCoins(amount) {
    GameState.coins += amount;
    saveProgress();
    updateUI();
}

function saveProgress() {
    const data = {
        level: GameState.level,
        xp: GameState.xp,
        coins: GameState.coins
    };
    localStorage.setItem('smartEduProgress', JSON.stringify(data));
}

function loadProgress() {
    const saved = localStorage.getItem('smartEduProgress');
    if (saved) {
        const data = JSON.parse(saved);
        GameState.level = data.level || 1;
        GameState.xp = data.xp || 0;
        GameState.coins = data.coins || 50;
    }
}

function updateUI() {
    if (dom.levelDisplay) dom.levelDisplay.textContent = GameState.level;
    if (dom.coinsDisplay) dom.coinsDisplay.textContent = GameState.coins;
    
    if (dom.xpBarFill) {
        const percentage = (GameState.xp / GameState.xpThreshold) * 100;
        dom.xpBarFill.style.width = `${percentage}%`;
    }
    
    if (dom.xpText) {
        dom.xpText.textContent = `${GameState.xp} / ${GameState.xpThreshold} XP`;
    }
}

// Simulation Function
function simulateLessonComplete() {
    addXP(20);
    addCoins(10);
}

// Run init when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);

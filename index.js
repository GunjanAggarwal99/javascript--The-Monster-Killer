// Import stylesheets
import './style.css';

// Write Javascript code!
const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');

const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logBtn = document.getElementById('log-btn');

function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}

const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 10;
const HEAL_VALUE = 20;

const enertedMaxLife = prompt('Please Enter Max Life', '100');
let selectMaxLife = parseInt(enertedMaxLife);
if (isNaN(selectMaxLife) || selectMaxLife <= 0) {
  selectMaxLife = 100;
}
let currentMonsterLife = selectMaxLife;
let currentPlayerHealth = selectMaxLife;
let hasBonusLife = true;

adjustHealthBars(selectMaxLife);

function reset() {
  currentMonsterLife = selectMaxLife;
  currentPlayerHealth = selectMaxLife;
  resetGame(selectMaxLife);
}

function endDisplay() {
  let initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth = currentPlayerHealth - playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert('Bonus Life used successfully');
    setPlayerHealth(initialPlayerHealth);
  }

  if (currentMonsterLife <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterLife > 0) {
    alert('You Lost!');
  } else if (currentMonsterLife <= 0 && currentPlayerHealth <= 0) {
    alert('Match is draw!');
  }

  if (currentPlayerHealth <= 0 || currentMonsterLife <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let damageValue;
  if (mode === 'ATTACK') {
    damageValue = ATTACK_VALUE;
  } else if (mode === 'STRONG_ATTACK') {
    damageValue = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(damageValue);
  currentMonsterLife = currentMonsterLife - damage;
  endDisplay();
}

function onAttack() {
  attackMonster('ATTACK');
  // const damage = dealMonsterDamage(ATTACK_VALUE);
  // currentMonsterLife = currentMonsterLife - damage;
  // const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  // currentPlayerHealth = currentPlayerHealth - playerDamage;
  // if (currentMonsterLife <= 0 && currentPlayerHealth > 0) {
  //   alert('You won!');
  // } else if (currentPlayerHealth <= 0 && currentMonsterLife > 0) {
  //   alert('You Lost!');
  // } else if (currentMonsterLife <= 0 && currentPlayerHealth <= 0) {
  //   alert('Match is draw!');
  // }
}
function onStrongAttack() {
  attackMonster('STRONG_ATTACK');
}
function onHeal() {
  let healValue;
  if (currentPlayerHealth >= selectMaxLife - HEAL_VALUE) {
    alert(" You can't heal more then the max life!");
    healValue = selectMaxLife - currentPlayerHealth;
  } else {
    healValue = selectMaxLife;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth = currentPlayerHealth + healValue;
  endDisplay();
}
attackBtn.addEventListener('click', onAttack);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', onHeal);

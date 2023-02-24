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
const MODE_ATTACK_VALUE = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_HEAL_ATTACK = 'HEAL_ATTACK';
const LOG_GAME_OVER = 'GAME_OVER';
let battleLog = [];
let lastLogged;

function enterMaxLife() {
  const enertedMaxLife = prompt('Please Enter Max Life', '100');
  const parseValue = parseInt(enertedMaxLife);
  if (isNaN(parseValue) || parseValue <= 0) {
    throw { message: 'Invalid max life ,please enter number to continue!' };
  }
  return parseValue;
}
let selectMaxLife;
try {
  selectMaxLife = enterMaxLife();
} catch (error) {
  console.log(error);
  selectMaxLife = 100;
  alert('you eneter wrong input , therfore it is taking 100 as default');
}

let currentMonsterLife = selectMaxLife;
let currentPlayerHealth = selectMaxLife;
let hasBonusLife = true;

adjustHealthBars(selectMaxLife);

function writeToLog(ev, val, MonsterHealth, playerHealth) {
  let logEntries;
  // let logEntries = {
  //   event: ev,
  //   value: val,
  //   finalPlayerHealth: playerHealth,
  //   finalMonsterHealth: MonsterHealth,
  // };
  // switch (ev) {
  //   case LOG_PLAYER_ATTACK:
  //     logEntries.target = 'MONSTER';
  //     break;
  //   case LOG_PLAYER_STRONG_ATTACK:
  //     logEntries = {
  //       event: ev,
  //       value: val,
  //       target: 'MONSTER',
  //       finalPlayerHealth: playerHealth,
  //       finalMonsterHealth: MonsterHealth,
  //     };
  //     break;
  //   case LOG_MONSTER_ATTACK:
  //     logEntries = {
  //       event: ev,
  //       value: val,
  //       target: 'PLAYER',
  //       finalPlayerHealth: playerHealth,
  //       finalMonsterHealth: MonsterHealth,
  //     };
  //     break;
  //   case LOG_HEAL_ATTACK:
  //     logEntries = {
  //       event: ev,
  //       value: val,
  //       target: 'PLAYER',
  //       finalPlayerHealth: playerHealth,
  //       finalMonsterHealth: MonsterHealth,
  //     };
  //     break;
  //   case LOG_GAME_OVER:
  //     logEntries = {
  //       event: ev,
  //       value: val,
  //       finalPlayerHealth: playerHealth,
  //       finalMonsterHealth: MonsterHealth,
  //     };
  //     break;
  //   default:
  //     logEntries = {};
  // }
  if (ev === LOG_PLAYER_ATTACK || ev === LOG_PLAYER_STRONG_ATTACK) {
    logEntries = {
      event: ev,
      value: val,
      target: 'MONSTER',
      finalPlayerHealth: playerHealth,
      finalMonsterHealth: MonsterHealth,
    };
  } else if (ev === LOG_MONSTER_ATTACK || ev === LOG_HEAL_ATTACK) {
    logEntries = {
      event: ev,
      value: val,
      target: 'PLAYER',
      finalPlayerHealth: playerHealth,
      finalMonsterHealth: MonsterHealth,
    };
  } else if (ev === LOG_GAME_OVER) {
    logEntries = {
      event: ev,
      value: val,
      finalPlayerHealth: playerHealth,
      finalMonsterHealth: MonsterHealth,
    };
  }
  battleLog.push(logEntries);
}

function reset() {
  currentMonsterLife = selectMaxLife;
  currentPlayerHealth = selectMaxLife;
  resetGame(selectMaxLife);
}

function endDisplay() {
  let initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth = currentPlayerHealth - playerDamage;

  writeToLog(
    LOG_MONSTER_ATTACK,
    playerDamage,
    currentMonsterLife,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert('Bonus Life used successfully');
    setPlayerHealth(initialPlayerHealth);
  }

  if (currentMonsterLife <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
    writeToLog(
      LOG_GAME_OVER,
      'PLAYER WON',
      currentMonsterLife,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterLife > 0) {
    alert('You Lost!');
    writeToLog(
      LOG_GAME_OVER,
      'MONSTER WON',
      currentMonsterLife,
      currentPlayerHealth
    );
  } else if (currentMonsterLife <= 0 && currentPlayerHealth <= 0) {
    alert('Match is draw!');
    writeToLog(
      LOG_GAME_OVER,
      'A DRAW',
      currentMonsterLife,
      currentPlayerHealth
    );
  }

  if (currentPlayerHealth <= 0 || currentMonsterLife <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let damageValue;
  let logEvent;
  if (mode === MODE_ATTACK_VALUE) {
    damageValue = ATTACK_VALUE;
    logEvent = LOG_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    damageValue = STRONG_ATTACK_VALUE;
    logEvent = LOG_PLAYER_STRONG_ATTACK;
  }

  const damage = dealMonsterDamage(damageValue);
  currentMonsterLife = currentMonsterLife - damage;
  writeToLog(logEvent, damage, currentMonsterLife, currentPlayerHealth);
  endDisplay();
}

function onAttack() {
  attackMonster(MODE_ATTACK_VALUE);
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
  attackMonster(MODE_STRONG_ATTACK);
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
  writeToLog(
    LOG_HEAL_ATTACK,
    healValue,
    currentMonsterLife,
    currentPlayerHealth
  );
  endDisplay();
}
function onLog() {
  let j = 0;
  outerWhile: do {
    console.log('outer', j);
    innerWhile: for (let k = 0; k < 5; k++) {
      if (k === 3) {
        // break outerWhile;
        continue;
      }
      console.log('inner', k);
    }
    j++;
  } while (j < 3);
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }
  let i = 0;
  for (const logEnt of battleLog) {
    if ((!lastLogged && lastLogged !== 0) || lastLogged < i) {
      console.log(`#${i}`);
      for (const key in logEnt) {
        console.log(`${key} : ${logEnt[key]}`);
      }
      lastLogged = i;
      break;
    }
    i++;
  }
}
attackBtn.addEventListener('click', onAttack);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', onHeal);
logBtn.addEventListener('click', onLog);

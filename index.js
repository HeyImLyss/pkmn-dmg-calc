#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import { styleText } from 'node:util';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { TYPE_CHART } from './types.js'

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function begin() {
  const colorMain = chalkAnimation.rainbow(
    'This is the Pokemon Damage Calculator! \n'
  );

  await sleep();
  colorMain.stop();

  console.log(`
      ${chalk.bgBlue('How to Use:')}
      This is a command line application that will help you
      understand Pokemon's system for damage calculation.
    `)
}

let atkType = '';
let dfType1 = '';
let dfType2 = '';


async function getEffectiveness(attackingType, defendingTypes) {
  const moveRelation = TYPE_CHART[attackingType.toUpperCase()];

  if (!moveRelation) return 1.0;

  return defendingTypes.reduce((totalMultiplier, defType) => {
    const match = moveRelation[defType.toUpperCase()];
    const currentMultiplier = match !== undefined ? match : 1.0;
    return totalMultiplier * currentMultiplier;
  }, 1.0);
}

async function attackHandler(attackingType) {
  const spinner = createSpinner('Checking Type...').start();
  await sleep();

  let atkTypeOutput = '';
  
  switch (attackingType) {
    case 'Normal':
      atkTypeOutput = 'Normal'
      break;
    case 'Grass':
      atkTypeOutput = 'Grass'
      break;
    case 'Water':
      atkTypeOutput = 'Water'
      break;
    case 'Fire':
      atkTypeOutput = 'Fire'
      break;
    case 'Electric':
      atkTypeOutput = 'Electric'
      break;
    case 'Flying':
      atkTypeOutput = 'Flying'
      break;
    case 'Ground':
      atkTypeOutput = 'Ground'
      break;
    case 'Rock':
      atkTypeOutput = 'Rock'
      break;
    case 'Fighting':
      atkTypeOutput = 'Fighting'
      break;
    case 'Ice':
      atkTypeOutput = 'Ice'
      break;
    case 'Poison':
      atkTypeOutput = 'Poison'
      break;
    case 'Bug':
      atkTypeOutput = 'Bug'
      break;
    case 'Ghost':
      atkTypeOutput = 'Ghost'
      break;
    case 'Psychic':
      atkTypeOutput = 'Psychic'
      break;
    case 'Dragon':
      atkTypeOutput = 'Dragon'
      break;
    case 'Dark':
      atkTypeOutput = 'Dark'
      break;
    case 'Fairy':
      atkTypeOutput = 'Fairy'
      break;
    case 'Steel':
      atkTypeOutput = 'Steel'
      break;
    default:
      console.log('Something went wrong...');
  }

  if (attackingType === atkTypeOutput) {
    spinner.success({ text: `Attacking Type is ${atkTypeOutput} Type!`});
    atkType = atkTypeOutput
  }
  else {
    console.log('Something went wrong while inputting attacking type');
  }

  
}

async function defendHandler(defendingType) {
  await sleep();
}

async function askAttack() {
  const answer = await inquirer.prompt({
    name: 'attack_question',
    type: 'select',
    message: 'Which type is attacking?',
    choices: [
    'Normal',
    'Grass',
    'Water',
    'Fire',
    'Electric',
    'Flying',
    'Ground',
    'Rock',
    'Fighting',
    'Ice',
    'Poison',
    'Bug',
    'Ghost',
    'Psychic',
    'Dragon',
    'Dark',
    'Fairy',
    'Steel',
  ],
  });  return attackHandler(answer.attack_question);
}

async function askDefend1() {
  const answer = await inquirer.prompt({
    name: 'defend_question1',
    type: 'select',
    message: 'What is the first defending type?',
    choices: [
      'Normal',
      'Grass',
      'Water',
      'Fire',
      'Electric',
      'Flying',
      'Ground',
      'Rock',
      'Fighting',
      'Ice',
      'Poison',
      'Bug',
      'Ghost',
      'Psychic',
      'Dragon',
      'Dark',
      'Fairy',
      'Steel',
    ],
  });   return defendHandler(answer.defend_question1);
}

await begin();
await askAttack();
await askDefend1();

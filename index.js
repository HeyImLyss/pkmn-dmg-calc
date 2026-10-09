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

  if (attackingType !== null) {
    let atkTypeOutput = attackingType;
    spinner.success({ text: `Attacking Type is ${atkTypeOutput} Type!`});
    atkType = atkTypeOutput
  }
  else {
    console.log('Something went wrong while inputting attacking type');
  }
};

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
  });   
  dfType1 = answer.defend_question1;
  
}

async function askDefend2() {
  const answer = await inquirer.prompt({
    name: 'defend_question2',
    type: 'select',
    message: 'What is the second defending type?',
    choices: [
      'None',
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
  });   dfType2 = answer.defend_question2;
}
await begin();
await askAttack();
await askDefend1();
await askDefend2();

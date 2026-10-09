#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import { styleText } from 'node:util';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { TYPE_CHART } from './types.js'

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

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

      Please keep in mind that this calculator uses type logic
      from Generation VI onwards - this means that Dark and Ghost
      are no longer resisted by Steel, for example.
    `)
}

let atkType = '';
let dfType1 = '';
let dfType2 = '';
let finalMult = 1.0;

async function getEffectiveness(attackingType, defendingTypes) {
  const moveRelation = TYPE_CHART[attackingType.toUpperCase()];
  const spinner = createSpinner('Checking Effectiveness...').start();
  await sleep();

  if (!moveRelation) {
    spinner.error({ text: 'Unknown attack type' });
    return 1.0;
  }

  const finalMult = defendingTypes.reduce((total, defType) => {
    const match = moveRelation[defType.toUpperCase()];
    return total * (match !== undefined ? match : 1.0);
  }, 1.0);

  spinner.success({ text: `Your move will be ${finalMult}x effective!` });
  return finalMult;
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
await getEffectiveness(atkType, [dfType1, dfType2]);

import assert from 'node:assert/strict';
import test from 'node:test';
import { getAssistantReply, suggestedQuestions } from './assistant.js';

test('answers verified identity concepts and colors', () => {
  assert.match(getAssistantReply('Explain the identity concepts'), /Pragati & Prakriti/);
  assert.match(getAssistantReply('What are the brand colours?'), /royal blue/);
});

test('does not invent admission, fee, contact, or fifth-value information', () => {
  assert.match(getAssistantReply('How much are the admission fees?'), /does not include verified admissions details/);
  assert.match(getAssistantReply('Who is the fifth identity value?'), /does not verify a fifth concept/);
  assert.match(getAssistantReply('What is their phone number?'), /No verified public email address or phone number/);
});

test('normalizes greetings and provides fallback and suggested questions', () => {
  assert.match(getAssistantReply('  HELLO!  '), /Hello!/);
  assert.match(getAssistantReply('What is the weather tomorrow?'), /does not verify that information/);
  assert.equal(suggestedQuestions.length, 6);
});

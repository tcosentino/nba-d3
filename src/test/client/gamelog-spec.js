/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */

import { should } from 'chai';
import { describe, it, beforeEach } from 'mocha';

import GameLog from '../../javascripts/entities/gameLog';

// lets us use chai assertions
should();

// used for our game log object
let gameLog;

describe('GameLog Object', () => {
  describe('Parsing', () => {
    beforeEach(() => {
      gameLog = new GameLog();
    });

    describe('Parse', () => {
      it('should show as parsed after parsing', () => {
        gameLog.parse();
        gameLog.isParsed().should.be.true;
      });
    });
  });
});

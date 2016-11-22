/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */

import path from 'path';
import chai from 'chai';
import { stub } from 'sinon';
import sinonChai from 'sinon-chai';
import { describe, it, beforeEach, before } from 'mocha';

import GameLog from '../../javascripts/entities/gameLog';

// lets us use chai assertions
chai.should();
chai.use(sinonChai);

// used for our game log object
let gameLog;

describe('GameLog Object', () => {
  describe('Constructor', () => {
    it('should set the file path with a given filePath option', () => {
      const thisGameLog = new GameLog({
        filePath: 'Sample/File/Path',
      });

      thisGameLog.getFilePath().should.equal('Sample/File/Path');
    });
  });

  describe('Parse', () => {
    beforeEach(() => {
      gameLog = new GameLog({ filePath: path.join(__dirname, '..', 'data', 'testGameLog.csv') });
    });

    it('should show as parsed after parsing', () => {
      return gameLog.parse()
        .then(() => {
          gameLog.isParsed().should.be.true;
        });
    });
  });

  describe('GetEvents', () => {
    before(() => {
      stub(GameLog.prototype, 'parse', function parseStub() {
        this.setEvents([{
          type: 'shot',
          player: 'curry',
        }, {
          type: 'shot',
          player: 'durant',
        }, {
          type: 'rebound',
          player: 'durant',
        }]);
      });
    });

    beforeEach(() => {
      // putting an arbitrary filepath because it will fail if not
      gameLog = new GameLog({ filePath: 'needsfilepath' });
      gameLog.parse();
    });

    it('should return an array of events', () => {
      gameLog.getEvents().should.be.instanceof(Array);
    });

    it('should return an empty array when passing a fake event', () => {
      const events = gameLog.getEvents({ type: 'Fake event type' });

      events.should.be.instanceof(Array);
      events.should.be.empty;
    });

    it('should return events of a given type', () => {
      const events = gameLog.getEvents({ type: 'shot' });

      events.should.deep.equal([{
        type: 'shot',
        player: 'curry',
      }, {
        type: 'shot',
        player: 'durant',
      }]);
    });

    it('should return events for a given player', () => {
      const events = gameLog.getEvents({ player: 'durant' });

      events.should.deep.equal([{
        type: 'shot',
        player: 'durant',
      }, {
        type: 'rebound',
        player: 'durant',
      }]);
    });

    it('should return all events when no argument is passed', () => {
      const events = gameLog.getEvents();

      events.should.deep.equal([{
        type: 'shot',
        player: 'curry',
      }, {
        type: 'shot',
        player: 'durant',
      }, {
        type: 'rebound',
        player: 'durant',
      }]);
    });
  });
});

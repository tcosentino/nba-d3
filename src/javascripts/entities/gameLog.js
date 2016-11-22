import _ from 'underscore';
import fs from 'fs';
import parse from 'csv-parse';
import GameEvent from './gameLog';

class GameLog {
  constructor(options = {}) {
    this.initializePrivateFields(options);
  }

  initializePrivateFields(options) {
    if (_.isUndefined(options.filePath)) {
      throw new Error('File path is required for a GameLog');
    }

    this._filePath = options.filePath;
    this._parsed = false;
    this._events = [];
  }

  parse() {
    const promise = new Promise((resolve) => {
      const parser = parse({ delimiter: ',' }, (err, data) => {
        // remove the first two rows (title rows)
        data.splice(0, 2);

        // loop through each element of data, create a GameEvent object and add it to the list
        _.each(data, (line) => {
          this.addEvent(new GameEvent(line));
        });

        this._parsed = true;
        resolve();
      });

      fs.createReadStream(this._filePath).pipe(parser);
    });

    return promise;
  }

  isParsed() {
    return this._parsed;
  }

  setEvents(newEvents) {
    this._events = newEvents;
  }

  addEvents(newEvents) {
    this._events.push(newEvents);
  }

  addEvent(newEvent) {
    this._events.push(newEvent);
  }

  getEvents(options = {}) {
    if (options === {}) {
      return this._events;
    }

    return _.where(this._events, options);
  }

  getFilePath() {
    return this._filePath;
  }
}

export default GameLog;

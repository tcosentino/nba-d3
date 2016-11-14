
class GameLog {
  constructor() {
    this.parsed = false;
  }

  parse() {
    this.parsed = true;
  }

  isParsed() {
    return this.parsed;
  }
}

export default GameLog;

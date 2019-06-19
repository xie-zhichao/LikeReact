class Observer {
  observerName = undefined;
  subsOn = {};
  subsOne = {};

  constructor (name='default') {
    this.observerName = name;
  }

  on (subject, handler) {
    if (!this.subsOn[subject]) this.subsOn[subject] = [];
    this.subsOn[subject].push(handler);
  }

  one () {
    if (!this.subsOne[subject]) this.subsOne[subject] = [];
    this.subsOne[subject].push(handler);
  }

  off (subject) {
    this.subsOn[subject] = undefined;
    this.subsOne[subject] = undefined;
  }

  trigger (subject, data) {
    const subsOnThis = this.subsOn[subject];
    if (!!subsOnThis) {
      subsOnThis.forEach(sub => {
        sub && sub(data);
      });
    }

    const subsOneThis = this.subsOne[subject];
    if (!!subsOneThis) {
      subsOneThis.forEach((sub, index) => {
        sub && sub(data);
        subsOneThis[index] = undefined;
      });
      this.subsOne[subject] = [];
    }
  }

 }

 const myObserver = new Observer('channel1');
 myObserver.on('test', (msg) => {
   console.log(msg);
 });

 setTimeout(() => {
   myObserver.trigger('test', 'Hello from test.');
 }, 2000);
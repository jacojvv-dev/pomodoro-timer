class Storage {
    constructor(options = {}) {
        this._options = {};
        this.options = { ...this._options, ...options };
    }
}

module.exports = Storage;
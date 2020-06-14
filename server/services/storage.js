export class Storage {
    constructor() {
        this.storage = {};
    }

    set(key, data) {
        this.storage[key] = data;
    }

    get(key) {
        return this.storage[key];
    }

    delete(key) {
        delete this.storage[key];
    }
}

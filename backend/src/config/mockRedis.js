// Mock Redis client for development
class MockRedis {
  constructor() {
    this.data = new Map();
    this.connected = false;
  }

  async connect() {
    this.connected = true;
    console.log('Mock Redis connected');
  }

  on(event, callback) {
    if (event === 'error') {
      // Don't trigger error for mock
    }
  }

  async get(key) {
    return this.data.get(key) || null;
  }

  async set(key, value, options = {}) {
    this.data.set(key, value);
    if (options.EX) {
      setTimeout(() => this.data.delete(key), options.EX * 1000);
    }
    return 'OK';
  }

  async incr(key) {
    const current = parseInt(this.data.get(key) || '0');
    const newValue = current + 1;
    this.data.set(key, newValue.toString());
    return newValue;
  }

  async incrBy(key, value) {
    const current = parseInt(this.data.get(key) || '0');
    const newValue = current + value;
    this.data.set(key, newValue.toString());
    return newValue;
  }

  async decrBy(key, value) {
    const current = parseInt(this.data.get(key) || '0');
    const newValue = Math.max(0, current - value);
    this.data.set(key, newValue.toString());
    return newValue;
  }

  async exists(key) {
    return this.data.has(key) ? 1 : 0;
  }

  async expire(key, seconds) {
    setTimeout(() => this.data.delete(key), seconds * 1000);
    return 1;
  }

  async keys(pattern) {
    const regex = new RegExp(pattern.replace('*', '.*'));
    return Array.from(this.data.keys()).filter(key => regex.test(key));
  }

  async zAdd(key, member) {
    const set = this.data.get(key) || [];
    set.push(member);
    this.data.set(key, set);
    return 1;
  }

  async zCard(key) {
    const set = this.data.get(key) || [];
    return set.length;
  }

  async zRemRangeByScore(key, min, max) {
    const set = this.data.get(key) || [];
    const filtered = set.filter(item => item.score < min || item.score > max);
    this.data.set(key, filtered);
    return set.length - filtered.length;
  }
}

export default new MockRedis();
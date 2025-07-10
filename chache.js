// cache.js
export class SimpleCache {
    constructor(ttl = 60000) {
      this.ttl = ttl;
      this.cache = new Map();
    }
  
    get(key) {
      const entry = this.cache.get(key);
      if (!entry || Date.now() > entry.expiresAt) {
        this.cache.delete(key);
        return null;
      }
      return entry.value;
    }
  
    set(key, value) {
      this.cache.set(key, {
        value,
        expiresAt: Date.now() + this.ttl,
      });
    }
  
    clear() {
      this.cache.clear();
    }
  }
  
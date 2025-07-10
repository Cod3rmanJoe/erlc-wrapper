// index.js
import fetch from 'node-fetch';
import { SimpleCache } from './cache.js';

export class ERLCClient {
  constructor({ serverKey, cacheTTL = 0 }) {
    if (!serverKey) throw new Error("Missing ERLC server key");
    this.serverKey = serverKey;
    this.cache = cacheTTL > 0 ? new SimpleCache(cacheTTL) : null;
    this.baseURL = 'https://api.policeroleplay.community/v1/server';
  }

  async _request(endpoint, method = 'GET', body = null, cacheKey = null) {
    const headers = {
      "server-key": this.serverKey,
      "Accept": "*/*"
    };

    if (method === 'POST') {
      headers["Content-Type"] = "application/json";
    }

    const url = `${this.baseURL}${endpoint}`;

    if (this.cache && cacheKey) {
      const cached = this.cache.get(cacheKey);
      if (cached) return cached;
    }

    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Error ${res.status}: ${text}`);
    }

    const data = await res.json();

    if (this.cache && cacheKey) {
      this.cache.set(cacheKey, data);
    }

    return data;
  }

  getServerStatus() {
    return this._request('', 'GET', null, 'status');
  }

  getPlayers() {
    return this._request('/players', 'GET', null, 'players');
  }

  getVehicles() {
    return this._request('/vehicles', 'GET', null, 'vehicles');
  }

  runCommand(commandText) {
    return this._request('/command', 'POST', { command: commandText });
  }
}

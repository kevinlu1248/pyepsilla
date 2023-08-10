import axios from 'axios';

class Client {
  constructor(protocol = 'http', host = 'localhost', port = '8888') {
    this.protocol = protocol;
    this.host = host;
    this.port = port;
    this.baseurl = `${this.protocol}://${this.host}:${this.port}`;
    this.db = null;
    this.timeout = 10000; // 10 seconds
    this.header = {'Content-Type': 'application/json'};
  }

  async checkNetworking() {
    try {
      await axios.get(this.baseurl);
      console.log(`[INFO] Connected to ${this.host}:${this.port} successfully.`);
    } catch (error) {
      throw new Error(`[ERROR] Failed to connect to ${this.host}:${this.port}`);
    }
  }

  async welcome() {
    const response = await axios.get(`${this.baseurl}/`, {headers: this.header, timeout: this.timeout});
    return [response.status, response.data];
  }

  async state() {
    const response = await axios.get(`${this.baseurl}/state`, {headers: this.header});
    return [response.status, response.data];
  }

  // Implement the rest of the methods in the same way, using axios to make the HTTP requests
}
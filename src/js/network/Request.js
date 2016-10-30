import request from 'superagent';
import Env from 'Env';

class Request {
  constructor() {
    this.request = request;
    this.headers = {
      Accept: 'application/json'
    };
    let token = localStorage.getItem('token');
    if (token === null) {
      // this.headers['Authorization'] = 'Bearer ' + token;
    }
  }

  send(data) {
    this.data = data;
    return this;
  }

  getUrl(path) {
    return Env.apiUrl + path;
  }

  get(url, callback) {
    this.request = this.request.get(this.getUrl(url));
    if (this.data) {
      this.request.query(this.data);
    }
    this.end(callback);
  }

  post(url, data, callback) {
    this.request = this.request.post(this.getUrl(url), data);
    this.end(callback);
  }

  end(callback) {
    if (Object.keys(this.headers).length > 0) {
      this.request.set(this.headers);
    }

    this.request.end((error, response) => {
      if (typeof response === 'undefined') {
        return;
      }

      let body = null;
      if ('body' in response) {
        body = response.body;
      }
      callback(body, response, error);
    });
  }
}

export default Request;

import request from 'superagent';
import Env from 'Env';

class Request {
  constructor() {
    this.request = request;
    this.data = {};
    this.files = {};
    this.headers = {
      Accept: 'application/json'
    };
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.headers['Authorization'] = 'Bearer ' + token;
    }
  }

  attach(name, file) {
    if (!file) {
      return this;
    }

    this.headers['Accept'] = file.type;
    this.files[name] = file;
    return this;
  }

  send(data) {
    this.data = data;
    return this;
  }

  responseType(type) {
    this.type = type;
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
    this.request = this.request.post(this.getUrl(url));
    this.data = data;
    this.sendData();
    this.end(callback);
  }

  put(url, data, callback) {
    this.request = this.request.post(this.getUrl(url));
    this.data = data;
    this.data._method = 'PUT';
    this.sendData();
    this.end(callback);
  }

  delete(url, callback) {
    this.request = this.request.delete(this.getUrl(url))
    this.end(callback)
  }

  sendData() {
    if (Object.keys(this.files).length > 0) {
      Object.keys(this.data).forEach((key) => {
        this.request.field(key, this.data[key]);
      });
      Object.keys(this.files).forEach((name) => {
        const file = this.files[name];
        this.request.attach(name, file);
      });
    } else {
      this.request.send(this.data);
    }
  }

  end(callback) {
    if (Object.keys(this.headers).length > 0) {
      this.request.set(this.headers);
    }

    if (this.type) {
      this.request.responseType(this.type);
    }

    this.request.end((error, response) => {
      if (typeof response === 'undefined') {
        return;
      }
      if ('authorization' in response.headers) {
        const token = response.headers.authorization.split(" ")[1];
        localStorage.setItem('token', token);
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

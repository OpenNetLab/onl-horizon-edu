import axios from 'axios';

/**
 * get method
 * @param {String} url [request url]
 * @param {Object} params [request parameters]
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, params, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post method
 * @param {String} url [request url]
 * @param {Object} params [request parameters]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
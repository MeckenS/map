class Helper {
  static baseUrl() {
    return 'https://api.foursquare.com/v2';
  }

  static auth() {
    const keys = {
      client_id: 'WQD1L2ZACIORJHQCUJQZASDMGBW4AGP1U3OOWUT3GYOBV1LU',
      client_secret: 'EB3WAOBPQKNAXKCVR3V0LIKUNHGSZLWZARI0EAROHNES12PI',
      v: '20181101'
    };
    return Object.keys(keys).map(key => `${key}=${keys[key]}`).join('&');
  }

  static urlBuilder(urlPrams) {
    if(!urlPrams) {
      return '';
    }
    return Object.keys(urlPrams).map(key => `${key}=${urlPrams[key]}`).join('&');
  }
  //uses above static functions and Prams from App.js to form a fetch request to the Foursquare API
  static simpleFetch(endPoint,method,urlPrams) {
    let requestInfo = {
      method,
      headers: {Accept: 'application.json'}
    };
    return fetch(`${Helper.baseUrl()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`,requestInfo).then(res => res.json());
  }
}

export default class FourSquareAPI {
  static search(urlPrams) {
    return Helper.simpleFetch('/venues/search', 'GET', urlPrams);
  }
}

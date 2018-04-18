import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

// const baseUrl = 'http://localhost:8080/api';
// const baseUrl = 'http://localhost:8100/api';    //proxy url
const baseUrl = 'https://robot-builder.herokuapp.com/api';    //heroku url

export abstract class ApiProvider {
  http: HttpClient;

  constructor() {
  }

  getCollection(endPoint: string, params = new HttpParams()) {
    return this.http.get(`${baseUrl}/${endPoint}`, {params: params});
  }

  getDocumentById(endPoint: string, id: string) {
    return this.http.get(`${baseUrl}/${endPoint}/${id}`);
  }

  deleteDocument(endPoint: string, id: string) {
    return this.http.delete(`${baseUrl}/${endPoint}/${id}`);
  }

  addDocument(endPoint: string, data: any) {
    return this.http.post(`${baseUrl}/${endPoint}`, JSON.stringify(data), {
      headers: this.httpOptions
    });
  }

  updateDocument(endPoint: string, id: string, data: any) {
    return this.http.put(`${baseUrl}/${endPoint}/${id}`, JSON.stringify(data), {
      headers: this.httpOptions,
    });
  }

  private get httpOptions() {
    return new HttpHeaders({'Content-Type': 'application/json'});
  }

}

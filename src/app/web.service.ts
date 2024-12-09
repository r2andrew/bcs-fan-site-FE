import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class WebService{
  pageSize: number = 65
  constructor(private http: HttpClient) { }
  getEpisodes() {
    return this.http.get<any>(
      // pull all records, pagination handled on frontend
      'http://localhost:5000/api/v1.0/episodes?pn='+'&ps=' + this.pageSize);
  }

  getEpisode(id: any) {
    return this.http.get<any>(
      'http://localhost:5000/api/v1.0/episodes/' + id);
  }

  getTrivias(id: any) {
    return this.http.get<any>('http://localhost:5000/api/v1.0/episodes/' +
      id + '/trivias');
  }
  postTrivia(id: any, trivia: any, token:any) {
      let postData = new FormData();
      postData.append("text", trivia.trivia);
      const httpOptions = {
        headers: new HttpHeaders({
          'x-access-token': token
        })
      };
      return this.http.post<any>(
        'http://localhost:5000/api/v1.0/episodes/' +
        id + "/trivias", postData, httpOptions);
    }

  editTrivia(eId: any, tId: any, trivia: any, token:any) {
    let postData = new FormData();
    postData.append("text", trivia.editedTrivia);
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    };
    return this.http.patch<any>(
      'http://localhost:5000/api/v1.0/episodes/' +
      eId + "/trivias/" + tId, postData, httpOptions);
  }

  voteTrivia(eId: any, tId: any, voteDirection: string, token: any) {
      const httpOptions = {
        headers: new HttpHeaders({
          'x-access-token': token
        })
      };
      return this.http.patch<any>(
        'http://localhost:5000/api/v1.0/episodes/' + eId + '/trivias/' + tId + '/vote?vote=' + voteDirection,
        '', httpOptions
      )
  }

  deleteTrivia(eId: any, tId: any, token:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    };
    return this.http.delete<any>(
      'http://localhost:5000/api/v1.0/episodes/' + eId + '/trivias/' + tId,
      httpOptions
    )
  }

  register(form: any) {
    let postData = new FormData();
    postData.append('name', form.name)
    postData.append('username', form.username)
    postData.append('password', form.password)
    postData.append('email', form.email)
    return this.http.post<any>(
      'http://localhost:5000/api/v1.0/register', postData);
  }

  login(creds: any) {
    let authData = 'Basic ' + btoa(creds.username + ':' + creds.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization': authData
      })
    };
    return this.http.get<any>('http://localhost:5000/api/v1.0/login',
      httpOptions)
  }

  logout(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token
      })
    };
    return this.http.get<any>('http://localhost:5000/api/v1.0/logout',
      httpOptions)
  }

  ban(uId: any, token: any) {
    console.log(token)
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    };
    return this.http.patch<any>('http://localhost:5000/api/v1.0/ban/' + uId,
      '', httpOptions)
  }
}

import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from 'rxjs';

/**
 * The WebService provides connections to the backend API
 */
@Injectable()
export class WebService{
  /**
   * The page size to return. This app pulls all records and handles pagination on the front end
   * for the purposes of speed
   */
  pageSize: number = 65

  /**
   * The constructor for the Web Service
   * @constructor
   * @param http Injecting the httpClient to the Web Service
   */
  constructor(private http: HttpClient) { }

  /**
   * Fetch all episodes
   * @returns An Observable of all episodes
   */
  getEpisodes(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:5000/api/v1.0/episodes?pn='+'&ps=' + this.pageSize);
  }
  /**
   * Fetch one episodes
   * @param id The id of the desired episode
   * @returns An Observable of the specified episode
   */
  getEpisode(id: any): Observable<any> {
    return this.http.get<any>(
      'http://localhost:5000/api/v1.0/episodes/' + id);
  }
  /**
   * Fetch all trivias for an episode
   * @param id The id of the desired episode
   * @returns An Observable of the trivias associated with an episode
   */
  getTrivias(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/v1.0/episodes/' +
      id + '/trivias');
  }
  /**
   * Post a new trivia to an episode
   * @param id The id of the desired episode
   * @param trivia The form holding the trivia data to be added
   * @param token The token used to validate the request
   * @returns An http code used to determine if the request was successful or not
   */
  postTrivia(id: any, trivia: any, token: any): Observable<any> {
      let postData = new FormData();
      postData.append("text", trivia.trivia);
      const httpOptions = {
        headers: new HttpHeaders({
          'x-access-token': token })
      };
      return this.http.post<any>(
        'http://localhost:5000/api/v1.0/episodes/' +
        id + "/trivias", postData, httpOptions);
    }
  /**
   * Edit an existing trivia
   * @param eId The id of the desired episode
   * @param tId The id of the desired trivia
   * @param trivia The form holding the updated trivia data
   * @param token The authentication token used to validate the request
   * @returns An http code used to determine if the request was successful or not
   */
  editTrivia(eId: any, tId: any, trivia: any, token:any): Observable<any> {
    let postData = new FormData();
    postData.append("text", trivia.editedTrivia);
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token })
    };
    return this.http.patch<any>(
      'http://localhost:5000/api/v1.0/episodes/' +
      eId + "/trivias/" + tId, postData, httpOptions);
  }
  /**
   * Vote on trivia
   * @param eId The id of the desired episode
   * @param tId The id of the desired trivia
   * @param voteDirection The vote direction, either up or down
   * @param token The authentication token used to validate the request
   * @returns An http code used to determine if the request was successful or not
   */
  voteTrivia(eId: any, tId: any, voteDirection: string, token: any): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'x-access-token': token })
      };
      return this.http.patch<any>(
        'http://localhost:5000/api/v1.0/episodes/' + eId + '/trivias/' + tId + '/vote?vote=' + voteDirection,
        '', httpOptions )
  }
  /**
   * Delete a trivia
   * @param eId The id of the desired episode
   * @param tId The id of the desired trivia
   * @param token The authentication token used to validate the request. Must be OP or admin
   * @returns An http code used to determine if the request was successful or not
   */
  deleteTrivia(eId: any, tId: any, token:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token })
    };
    return this.http.delete<any>(
      'http://localhost:5000/api/v1.0/episodes/' + eId + '/trivias/' + tId,
      httpOptions )
  }
  /**
   * Register a new user
   * @param form The form holding the data of the new user
   * @returns An http code used to determine if the request was successful or not
   */
  register(form: any): Observable<any> {
    let postData = new FormData();
    postData.append('name', form.name)
    postData.append('username', form.username)
    postData.append('password', form.password)
    postData.append('email', form.email)
    return this.http.post<any>(
      'http://localhost:5000/api/v1.0/register', postData);
  }
  /**
   * Login as an existing user
   * @param creds The form holding the data of the users login details
   * @returns A JSON object holding an x-access-token as well as username, name and admin status
   */
  login(creds: any): Observable<any> {
    let authData = 'Basic ' + btoa(creds.username + ':' + creds.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization': authData })
    };
    return this.http.get<any>('http://localhost:5000/api/v1.0/login',
      httpOptions)
  }
  /**
   * Logout logged-in user
   * @param token The token to log out and discard
   * @returns An http code used to determine if the request was successful or not
   */
  logout(token: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': token })
    };
    return this.http.get<any>('http://localhost:5000/api/v1.0/logout',
      httpOptions)
  }
  /**
   * Logout logged-in user
   * @param username The username to ban
   * @param token The token used to validate the request, must be admin
   * @returns An http code used to determine if the request was successful or not
   */
  ban(username: any, token: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token })
    };
    return this.http.patch<any>('http://localhost:5000/api/v1.0/ban/' + username,
      '', httpOptions)
  }
}

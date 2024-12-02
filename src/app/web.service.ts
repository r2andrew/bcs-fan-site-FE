import { HttpClient } from "@angular/common/http";
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


  postTrivia(id: any, trivia: any) {
      let postData = new FormData();
      postData.append("text", trivia.trivia);
      return this.http.post<any>(
        'http://localhost:5000/api/v1.0/episodes/' +
        id + "/trivias", postData);
    }
  }

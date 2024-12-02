import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class WebService{
  pageSize: number = 65
  constructor(private http: HttpClient) { }
  getEpisodes(page: number) {
    return this.http.get<any>(
      // pull all records, pagination handled on frontend
      'http://localhost:5000/api/v1.0/episodes?pn='+'&ps=' + this.pageSize);
  }
}

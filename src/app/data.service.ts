import jsonData from '../assets/episodes.json'

export class DataService {
  pageSize: number = 3;
  getEpisodes(page: number) {
    let pageStart = (page - 1) * this.pageSize;
    let pageEnd = pageStart + this.pageSize;
    return jsonData.slice(pageStart, pageEnd);
  }

  getLastPageNumber() {
    return Math.ceil( jsonData.length / this.pageSize );
  }

}

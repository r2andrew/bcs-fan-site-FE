import jsonData from '../assets/episodes.json'

export class DataService {
  pageSize: number = 3;

  getEpisodes(page: number) {

    let pageStart = (page - 1) * this.pageSize;
    let pageEnd = pageStart + this.pageSize;
    jsonData.sort((a,b) => {
      if (a.seasonNumber !== b.seasonNumber) {
        return a.seasonNumber - b.seasonNumber
      }
      return a.episodeNumber - b.episodeNumber
    })
    return jsonData.slice(pageStart, pageEnd);
  }

  getLastPageNumber() {
    return Math.ceil( jsonData.length / this.pageSize );
  }

  getEpisode(id: any) {
    let dataToReturn: any[] = [];
    jsonData.forEach( function(episode) {
      if (episode['_id']['$oid'] == id) {
        dataToReturn.push( episode );
      }
    })
    return dataToReturn;
  }

  postTrivia(id: any, trivia: any) {
    let newReview = {
      'text' : trivia.trivia,
      'user' : 'fakeUser',
      'createdDtm': {'$date': 'fake'},
      'modifiedDtm': {'$date': 'fake'},
      '_id': {'$oid': 'fake'},
      'upvotes': [],
      'downvotes': []
    };
    jsonData.forEach( function(episode) {
      if ( episode['_id']['$oid'] == id ) {
        episode['trivias'].push( newReview );
      }
    });
  }



}

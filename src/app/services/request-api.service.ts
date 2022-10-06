import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

  //https://api.themoviedb.org/3/movie/650?api_key=20f88930c44e60d087ab684260ea76ab
  private apiKey : string = "20f88930c44e60d087ab684260ea76ab";
  private urlRequest : string = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=es-MX&region=MX&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_watch_monetization_types=buy`;
  // private numMovie : string = "888";


  constructor(private http: HttpClient) { }

  getMovies(): Observable<any>{
    console.log("reque",);
    return this.http.get<any>(this.urlRequest).pipe(
      map((data:any) => {
        const response: any[] = [];
        data.results.forEach((item : any) => {
          let newResponse = {
            id: item.id,
            poster: item.poster_path
          }
          response.push(newResponse);
        });
        return response  
      })
    )
  }

  getMovieInfo(id: number): Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX`).pipe(
      map((res: any) => {
        let newResp = {
          poster: res.poster_path,
          genres: res.genres,
          date: res.release_date,
          title: res.title,
          overview: res.overview,
          background: res.backdrop_path
        }
        return newResp
      })
    )
  }

  getLikedMovies(): number[]{
    if(localStorage.getItem('likedMovies')){
      return JSON.parse(localStorage.getItem('likedMovies')!)
    }else return []
  }

  addLikedMovies(id: number){
    let likedMovies: any[] = this.getLikedMovies()

    if(likedMovies.indexOf(id) >= 0){
      let index = likedMovies.indexOf(id)
      likedMovies.splice(index, 1)
      localStorage.setItem('likedMovies', JSON.stringify(likedMovies))
      return false

    }else {
      likedMovies.push(id)
      localStorage.setItem('likedMovies', JSON.stringify(likedMovies))
      return true
    }
  }
  

}

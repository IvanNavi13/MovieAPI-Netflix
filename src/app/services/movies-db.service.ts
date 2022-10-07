import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ApiEndpoints } from '../utils/api.endPoints';
import { Constants } from '../utils/constants.class';

@Injectable({
  providedIn: 'root'
})
export class MoviesDbService {

  constructor(public http: HttpClient) { }

  /* Methods to request API */
  getGenres(): Observable<Object>{
    return this.http.get(environment.MOVIES_URL + ApiEndpoints.GENRE_LIST);
  }
  
  getTrending():Observable<Object>{
    return this.http.get(environment.MOVIES_URL + ApiEndpoints.TRENDING);
  }

  getMoviesByGenre(id: number):Observable<Object>{
    return this.http.get(environment.MOVIES_URL + ApiEndpoints.getMoviesByGenre(id));
  }
  
  getMovieImage(path: string){
    return ApiEndpoints.getImage(path);
  }
  /* Methods to request API */

  /**====================   Handle the localStorage   ====================**/

  /* Methods to add --- */
  addMovie(id: number, key: string){
    let myListArray = JSON.parse(localStorage.getItem(key) ?? '[]');  //parse -> converts a string to object
    if(myListArray.indexOf(id) == -1){
      myListArray.push(id);
      localStorage.setItem(key, JSON.stringify(myListArray));         //stringify -> converts a object to String
    }
  }
  
  addMovieToList(id:number){
    this.addMovie(id, Constants.MY_LIST);
  }
  
  addMovieToFavorites(id:number){
    this.addMovie(id, Constants.MY_FAVORITES);
  }
  /* Methods to add --- */

  
  /* Methods to remove --- */
  removeMovie(id: number, key: string){
    let myListArray = JSON.parse(localStorage.getItem(key) ?? '[]');
    let index = myListArray.indexOf(id);
    if(index > -1 ){
      myListArray.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(myListArray));
    }
  }
  
  removeMovieToList(id:number){
    this.removeMovie(id, Constants.MY_LIST);
  }
  
  removeMovieToFavorites(id:number){
    this.removeMovie(id, Constants.MY_FAVORITES);
  }
  /* Methods to remove --- */


  /* Methods to check --- */
  checkMovie(id:number, key:string) : boolean {
    let myListArray = JSON.parse(localStorage.getItem(key) ?? '[]');
    return (myListArray.indexOf(id) > -1);
  }
  
  checkMovieList( id : number) : boolean {
    return this.checkMovie(id, Constants.MY_LIST);
  }
  
  checkMovieFavorites( id : number) : boolean{
    return this.checkMovie(id, Constants.MY_FAVORITES);
  }
  /* Methods to check --- */
  
}


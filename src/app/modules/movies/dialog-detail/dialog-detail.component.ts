import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { MovieData } from '../../../models/movie-data.model';
import { MoviesDbService } from '../../../services/movies-db.service';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss']
})
export class DialogDetailComponent implements OnInit {

  constructor( 
    public moviesDb : MoviesDbService,
    @Inject(MAT_DIALOG_DATA) public data : MovieData) { }

    toggleMyList(){
      if(this.moviesDb.checkMovieList(this.data.id)) {
        this.moviesDb.removeMovieToList(this.data.id);
      }else {
        this.moviesDb.addMovieToList(this.data.id);
      }
    }

    toggleMyFavorite(){
      if(this.moviesDb.checkMovieFavorites(this.data.id)) {
        this.moviesDb.removeMovieToFavorites(this.data.id);
      }else {
        this.moviesDb.addMovieToFavorites(this.data.id);
      }
    }

  ngOnInit(): void {
  }

}

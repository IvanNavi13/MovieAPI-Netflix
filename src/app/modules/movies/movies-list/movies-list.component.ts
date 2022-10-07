import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesDbService } from '../../../services/movies-db.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieData } from '../../../models/movie-data.model';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  currentId !: number;
  movies : MovieData[] = [];

  constructor(public activeRouter : ActivatedRoute, 
    public moviesDb : MoviesDbService,
    public dialog : MatDialog) { }

  ngOnInit( ): void {
    this.activeRouter.params.subscribe( params => {
      if(JSON.stringify(params) == '{}'){
        this.getTrending();
      }else {
        this.currentId = parseInt(params['id']);
        this.getMovies();
      }
    });
  }

  getTrending(){
    this.moviesDb.getTrending().subscribe( (response:any) => {
      this.movies = <MovieData[]>response['results'];
    })
  }

  getMovies(){
    this.moviesDb.getMoviesByGenre(this.currentId).subscribe( (response:any) => {
      this.movies = <MovieData[]>response['results'];
    })
  }

  openDetail( movie : MovieData){
    console.log(movie);
    this.dialog.open(DialogDetailComponent, {
      height : '700px',
      width : '600px',
      data : movie
    });

  }

}

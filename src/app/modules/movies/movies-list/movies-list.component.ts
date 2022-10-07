import { Component, HostListener, OnInit } from '@angular/core';
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
  movies: MovieData[] = [];
  currentPage : number = 1;

  constructor(public activeRouter: ActivatedRoute,
    public moviesDb: MoviesDbService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      if (JSON.stringify(params) == '{}') {
        this.getTrending();
      } else {
        this.currentId = parseInt(params['id']);
        this.getMovies();
      }
    });
  }

  getTrending() {
    this.moviesDb.getTrending(this.currentPage).subscribe((response: any) => {
      this.movies = this.movies.concat(<MovieData[]>response['results']);
    })
  }

  getMovies() {
    this.moviesDb.getMoviesByGenre(this.currentId, this.currentPage).subscribe((response: any) => {
      this.movies = this.movies.concat(<MovieData[]>response['results']);
    })
  }

  openDetail(movie: MovieData) {
    console.log(movie);
    this.dialog.open(DialogDetailComponent, {
      height: '700px',
      width: '600px',
      data: movie
    });

  }

  // // @HostListener('scroll', ['$event']) // for scroll events of the current element
  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // // onScroll(event : any) {
  // //   console.log(event)
  // // }
  // onScroll(event: Event) {

  //   console.log("event");
  //   console.log(event);
  // }

  onScroll(event: any): void{
    console.log(event);
    
    let _target : Element = event.target;
    let currentPosition = _target.scrollTop;
    let scrollHeight = _target.scrollHeight;
    let elementHeight = _target.clientHeight;

    let maxPosition = scrollHeight - elementHeight /* -150 */;

    if(currentPosition >= maxPosition){
      console.log(currentPosition, maxPosition);
      this.currentPage ++;
      console.log(this.currentPage);
      this.getMovies;
    }

  }

}

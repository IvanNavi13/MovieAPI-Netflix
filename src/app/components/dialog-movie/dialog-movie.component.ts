import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestApiService } from '../../services/request-api.service';

@Component({
  selector: 'app-dialog-movie',
  templateUrl: './dialog-movie.component.html',
  styleUrls: ['./dialog-movie.component.scss']
})
export class DialogMovieComponent implements OnInit {

  @ViewChild('imagen') imagen!: ElementRef
  @ViewChild('add') add!: ElementRef
  @ViewChild('like') like!: ElementRef

  movie: any
  isLiked: boolean = false


  constructor(public dialogRef: MatDialogRef<DialogMovieComponent>,
                    @Inject(MAT_DIALOG_DATA) public data: any,
                    public dataServiceMovie: RequestApiService) { }

  ngOnInit(): void {

    this.dataServiceMovie.getMovieInfo(this.data).subscribe({
      next: (res => {
        // console.log(res);
        this.movie = res
      }),
      error: (err => {
        console.error(err);
      }),
      complete: () => {
        if(this.dataServiceMovie.getLikedMovies().indexOf(this.data) >= 0){
          this.isLiked = true
        }
      }
    })


  }

  likeMovie(id: number){
    if(this.dataServiceMovie.addLikedMovies(id)){
      this.isLiked = true
      return true
    }else {
      this.isLiked = false
      return false
    }
  }

  close(){
    this.dialogRef.close()
  }

}

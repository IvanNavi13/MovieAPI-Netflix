import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RequestApiService } from '../../services/request-api.service';
import { DialogMovieComponent } from '../dialog-movie/dialog-movie.component';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  observableMovieService: any[]= [];
  
  constructor(public serviceMovie: RequestApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovieAPI();
  }

  getMovieAPI(){
    this.serviceMovie.getMovies().subscribe({
      next: (data) =>{
        console.log(data)
        this.observableMovieService = data;
    }})
  }

  openDialog(id: number) {
    const modalConfig = new MatDialogConfig()
    modalConfig.width = '800px'
    modalConfig.height = '650px'
    modalConfig.data = id
    modalConfig.hasBackdrop = true
    modalConfig.panelClass = 'modalBg'
    this.dialog.open(DialogMovieComponent, modalConfig)
  }

}


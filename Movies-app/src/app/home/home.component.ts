import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[];

  constructor(private movieService: MoviesService){
    this.getMovies();
  }

  getMovies(){
    this.movieService.get().subscribe(
      (data: Movie[]) => {
        this.movies = data;
    },
      (error) => {
      console.log(error);
      alert('ocurrio un error');
    });
  }

  ngOnInit() {
  }

  delete(id){
    if(confirm('are you sure to delete?')){
      this.movieService.delete(id).subscribe(
        (data) => {
          console.log(data);
          alert('pelicula eliminada');
          this.getMovies();
        },
        (error) => {
          console.log(error);
          alert('error');
        }
      );
    }
  }

}

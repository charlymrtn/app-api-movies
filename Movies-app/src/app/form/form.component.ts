import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  movie: Movie = {
    name: null,
    description: null,
    year: null,
    genre: null
  };

  id: any;
  editing: boolean = false;
  movies: Movie[];

  constructor(private _service: MoviesService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.editing = true;
      this._service.get().subscribe(
        (data: Movie[]) => {
          this.movies = data;
          this.movie = this.movies.find((m) => { return m.id == this.id });

        },
        (error) => {
          console.log(error);
          alert('error!!!!')

        }
      )
    }else{
      this.editing = false;
    }

   }

  ngOnInit() {
  }

  saveMovie(){
    if(this.editing){
      this._service.put(this.movie).subscribe(
        (data) => {
          alert('pelicula editada');
      },
        (error) => {
          console.log(error);
          alert('ocurrio un error');
      });

    }else{

      this._service.save(this.movie).subscribe(
        (data) => {
          alert('pelicula guardada');
      },
        (error) => {
          console.log(error);
          alert('ocurrio un error');
      });
    }
  }
}

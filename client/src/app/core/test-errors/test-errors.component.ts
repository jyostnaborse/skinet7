import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient){
  }

validationError : string[] =[];

  get404Error(){
    this.http.get(this.baseUrl +"products/" + 50).subscribe({
      next: response => console.log(response),
      error: error => console.error(error)
    })
  }

  get500Error(){
    this.http.get(this.baseUrl +"buggy/servererror").subscribe({
      next: response => console.log(response),
      error: error => console.error(error)
    })
  }

  get400Error(){
    this.http.get(this.baseUrl +"buggy/badrequest").subscribe({
      next: response => console.log(response),
      error: error => {
        console.error(error);
      }
    })
  }

  get400ValidationError(){
    this.http.get(this.baseUrl +"products/fifty").subscribe({
      next: response => console.log(response),
      error: 
      error => {
        console.error(error);
        if(error.errors)
        {
          this.validationError = error.errors;
        }
      }
    })
  }

}

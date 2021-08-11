import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {of} from 'rxjs'
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMe:boolean=false;
  title = 'callArtApi';
  href="https://api.artic.edu/api/v1/artworks?page=1&limit=100"
  searchlink="https://api.artic.edu/api/v1/artworks/"
  id=String;
  users$ :Observable<any> | undefined;
  url: string;
  firstName:any;
  serverData: any;
  p:number = 1;
  errorMsg:any;
  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }



   constructor(private http:HttpClient  ){
    this.url = "";
    this.serverData = null;
   }

   ngOnInit(){
    this.fetchArt();
  
    
   }

   fetchArt(){
   this.users$ =this.http
   .get<any>(this.href)
   .pipe(
     map(results=>results.data)
     
     );
   console.log(this.users$)
  }
  Search(){
    if(this.firstName==""){
      this.fetchArt();
    }else{
      
      this.users$ =this.http
      .get<any>(this.searchlink+this.firstName)
      .pipe(
        map(results=>[results.data ]
          

          ),
          
          catchError(error => {
            
            console.log(error)
            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Errorif: ${error.error.message}`;
              
            } else {
                this.errorMsg = `${error.error.detail}`;
                this.showMe=true
            }
            return of([]);
        })
        
        );
        
      console.log(this.users$)
        
        ;
    }
  }
}

import { HttpClient ,HttpErrorResponse,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER="http://localhost:3000/products";
  constructor(private _httpClient:HttpClient) { }

handleError(error:HttpErrorResponse)
{
  debugger;
let errroMessage='unknown Error!';

if(error.error instanceof ErrorEvent)
{
  //client side error
  errroMessage='Error:'+ error.message;
}else{
  //Server side error
  errroMessage='Error Code :'+error.status+' \n Message:'+ error.message;
}
window.alert(errroMessage);
return throwError(errroMessage);

}



  public sendGetRequest(){
    //URL code parameter
    const options={params:new HttpParams({
      fromString:"_page=1&_limit=20"
    })}; 
    return this._httpClient.get(this.REST_API_SERVER,options).pipe(retry(3),catchError(this.handleError));
  }


}

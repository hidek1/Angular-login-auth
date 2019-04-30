import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private loginUrl = 'http://localhost:3000/user';  // Web APIのURL
  constructor(private http: HttpClient) {}

  sendUserData (user: User): Observable<User> {
    const url = `${this.loginUrl}/login`;
    return this.http.post<User>(url, user, httpOptions).pipe(
      tap((user: User) => console.log(user)),
      catchError(this.handleError<User>('send user data'))
    );
  }

  getUserDataByToken (token: string): Observable<User> {
    const url = `${this.loginUrl}/${token}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user`)),
      catchError(this.handleError<User>(`get user data`))
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力
 
      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      console.log(`${operation} failed: ${error.message}`);
 
      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
}
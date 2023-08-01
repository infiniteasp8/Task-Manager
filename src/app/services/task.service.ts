import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) { }
  addTask(data: any): Observable<any> {
    return this._http.post('https://backend-lib3.onrender.com/tasks',data);
  }
  updateTask(id:string,data: any): Observable<any> {
    return this._http.patch(`https://backend-lib3.onrender.com/tasks/${id}`,data);
  }

  getTaskList(): Observable<any> {
    return this._http.get('https://backend-lib3.onrender.com/tasks');
  }
  deleteTask(id: string): Observable<any> {
    return this._http.delete(`https://backend-lib3.onrender.com/tasks/${id}`);
  } 
  
}

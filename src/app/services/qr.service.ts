import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QrDataModel, QrDataResultModel } from '../models';
import { WebapiService } from './webapi.service';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private webapi: WebapiService) { }

  generate(model: QrDataModel): Observable<QrDataResultModel>{
    let url = 'api/generate-qr';
    return this.webapi.post(url, model);
  }

  verify(message: string, signature: string): Observable<any>{
    let url = 'api/verify';
    return this.webapi.post(url, {message: message, signature: signature});
  }

  encode(data: string): Observable<any>{
    let url = 'api/encode';
    return this.webapi.post(url, {text: data});
  }

  verify2(uniId: string, docId: string, studentId: string,  signature: string, ): Observable<any> {
    let url = 'core/verify2';
    let obj = { uniId: uniId, docId: docId, studentId: studentId, signature: signature };
    console.log(obj);
    return this.webapi.post(url, obj);
  }
}

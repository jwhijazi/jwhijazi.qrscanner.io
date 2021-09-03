import { Component, OnInit } from '@angular/core';
import { QrDataModel, QrDataResultModel } from 'src/app/models';
import { QrService } from 'src/app/services/qr.service';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.css']
})
export class GenerateQrComponent implements OnInit {

  codec = new HttpUrlEncodingCodec;

  uniId: string = "45";
  docId: string = "doc003";
  studentId: string = "3100042";

  result: QrDataResultModel;
  error: string;

  constructor(private qrSRV: QrService, private router: Router) { }

  ngOnInit(): void {
  }

  generate(){
    let model: QrDataModel = {
      uniId: this.uniId,
      docId: this.docId,
      studentId: this.studentId
    };

    this.qrSRV.generate(model).subscribe((result: QrDataResultModel)=>{
      this.result = result;
    });
  }

  scanAndVerify(message: string, signature: string){

    this.qrSRV.encode(message).subscribe((result)=>{
      let msg = this.ngDecode(result.data);
      this.qrSRV.encode(signature).subscribe((result)=>{
        let sig = this.ngDecode(result.data);
        let url = "/verify";    
        this.router.navigate([url], { queryParams: {message: msg, signature: sig}});
      });
    });

    //let msg = this.encodeMsg(message);
    //let sig = this.ngEncode(signature);
    //let url = "/verify";
    //this.router.navigate([url], { queryParams: {message: msg, signature: sig}});
  }

  encodeMsg(msg: string){
    let search1 = '{';
    let search2 = '}';
    let replaceWith1 = '%7B';
    let replaceWith2 = '%7D';

    let result = msg.split(search1).join(replaceWith1);
    result = result.split(search2).join(replaceWith2);

    return result;
  }

  ngDecode(param: string){
    return decodeURIComponent(param);
  }

}

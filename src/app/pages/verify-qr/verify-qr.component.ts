import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { QrService } from 'src/app/services/qr.service';

@Component({
  selector: 'app-verify-qr',
  templateUrl: './verify-qr.component.html',
  styleUrls: ['./verify-qr.component.css']
})
export class VerifyQrComponent implements OnInit {


  error:string;

  message: string;
  signautre: string;
  verified: boolean = false;
  msg: string;
  obj: any;

  constructor(private route: ActivatedRoute, private qrSRV: QrService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((qparams)=>{
      if (!qparams['message'] || !qparams['signature']){
        this.error = "Missing Message or Signature Parameters";
      }
      else{
        this.ver2(qparams);
      }
    });
  }

  ver1(qparams: Params){
    this.error = '';
    this.message = qparams['message'];
    this.signautre = qparams['signature'];
    this.signautre = this.signautre.replace(/\s/g, '+');

    let data = this.message.replace(/\\/g, '');
    this.obj = JSON.parse(data);
    console.log(this.obj);

    this.qrSRV.verify2(this.obj.UniId, this.obj.DocId, this.obj.StudentId, this.signautre).subscribe((result) => {
      this.verified = result.verified;
      this.msg = result.msg;
    });
  }

  ver2(qparams: Params) {
    this.error = '';
    this.message = qparams['message'];
    this.signautre = qparams['signature'];

    this.qrSRV.verify(this.message, this.signautre).subscribe((result) => {
      this.verified = result.verified;
      this.msg = result.msg;
    });
  }

}

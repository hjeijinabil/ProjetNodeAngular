import { ZoomService } from './../zoom.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Signature } from 'src/app/interfaces/Signature';
import { AppError } from 'src/app/exceptions/AppError';
import { DOCUMENT } from '@angular/common';
// import { ZoomMtg } from '@zoomus/websdk';


@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute,
    private zoomService: ZoomService,
    @Inject(DOCUMENT) document: any
  ) { }
  ngOnInit() {
    // this.meetingNumber = this.route.snapshot.paramMap.get('meeting') || '';
    // this.passcode = this.route.snapshot.paramMap.get('passcode') || '';
    // this.role = this.route.snapshot.paramMap.get('role') || '';
    

  }

  async ngAfterContentInit() : Promise<any>{
    const {ZoomMtg} = await import('@zoomus/websdk');
    ZoomMtg.setZoomJSLib('https://source.zoom.us/lib','/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();


    let payload ={
      meetingNumber:'89864707675',
      passWord:'v1uNca',
      sdkKey:'XNUHXGoTE6vkweU1cdPdA',
      sdkSecret:'D75ykERdue6KoqwmyO1pSY91oU60Zo31',
      userName:'lawwwwwwwwwww',
      userEmail:'',
      role:'0' ,//we are joining
      leaveUrl :'https://localhost:4200'
    };

    ZoomMtg.generateSDKSignature({
      meetingNumber:payload.meetingNumber,
      role:payload.role,
      sdkKey:payload.sdkKey,
      sdkSecret:payload.sdkSecret,
      success:function(signature:any) {
        ZoomMtg.init({
          leaveUrl:payload.leaveUrl,
          success:function(data : any) {
            ZoomMtg.join({
              meetingNumber:payload.meetingNumber,
              passWord:payload.passWord,
              sdkKey:payload.sdkKey,
              userName:payload.userName,
              userEmail:payload.userEmail,
              signature:signature.result,
              tk:'',
              success:function(data:any) {
                console.log(data);
              },
              error:function(error:any) {
                console.log("error join ",error);
              }

            })
          },
          error:function(error:any) {
            console.log("error init ",error);
          }
        })
      },
      error:function(error:any) {
        console.log(error);
      }
    })
  }
  

  
  



}

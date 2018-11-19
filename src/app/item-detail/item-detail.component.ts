import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../core/data.service";
import { RouterExtensions } from "nativescript-angular/router";
import * as email from "nativescript-email";
import { alert } from "tns-core-modules/ui/dialogs";

@Component({
    selector: "ItemDetail",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html",
    styleUrls: ["./item-detail.component.css"]
})
export class ItemDetailComponent implements OnInit {
    imageUrl: string;
    emailTx: string;
    subjectlTx: string;
    messagetext: string;
    
    constructor(
        private dataSvc: DataService,
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        //https://dc6353db.ngrok.io/
        let imageUrl = this.dataSvc.getLocalStorage('imageUrl') || "https://dc6353db.ngrok.io";
        if(typeof(imageUrl) !== 'undefined'){
            imageUrl = imageUrl.replace(/"/g, "");
        }
        
        this.imageUrl = `${imageUrl}${this.route.snapshot.params.id}`;  
    }

    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    /*
    attachments: [
                    {
                        fileName: 'attachment.png',
                        path: '',
                        mimeType: 'image/png'
                    }]
    */

    public onSend(event){
        console.log(this.emailTx);
        console.log(this.subjectlTx);
        console.log(this.messagetext);
        var subjectText = this.subjectlTx;
        var bodytText = this.messagetext;
        var emailAddress = this.emailTx;
        
        let dataService = this.dataSvc;
        email.available().then((avail: boolean) => {
            console.log("Email available? " + avail);
            email.compose({
                subject: this.subjectlTx,
                body: this.messagetext + " " + this.imageUrl,
                to: [this.emailTx],
                cc: [this.emailTx],
                bcc: [this.emailTx],
                
            }).then(
            function() {
                console.log("Email composer closed -> DONE");
                let options = {
                    title: "Email sent",
                    message: "Email sent!",
                    okButtonText: "OK"
                };

                alert(options).then(() => {
                    console.log("Email sent!");
                });
                console.log("arrSent > " + dataService.getLocalStorage("emailSent"));
                var arrSent:any = [];
                if(typeof(dataService.getLocalStorage("emailSent")) !== 'undefined'){
                    let x = dataService.getLocalStorage("emailSent");
                    if(typeof(x) !== 'undefined'){
                        let yy = JSON.parse(x);
                        for(let zy=0; zy < yy.length; zy++){
                            console.log(yy[zy]);
                            arrSent.push(yy[zy]);
                        }
                    }
                }
                let x = {
                    email: emailAddress,
                    sentDate: new Date(),
                    imageUrl: bodytText,
                    subject: subjectText,
                }
                arrSent.push(x);
                dataService.setLocalStorage("emailSent", arrSent);
            }, function(err) {
                console.log("Error: " + err);
            });
        });
     
        
    }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../core/data.service";
import { RouterExtensions } from "nativescript-angular/router";
import * as email from "nativescript-email";
import { tap } from "rxjs/operators";

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
        private data: DataService,
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.imageUrl = `https://dc6353db.ngrok.io/${this.route.snapshot.params.id}`;  
    }

    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }

    public onSend(event){
        console.log(this.emailTx);
        console.log(this.subjectlTx);
        console.log(this.messagetext);
        
        email.available().then((avail: boolean) => {
            console.log("Email available? " + avail);
            email.compose({
                subject: this.subjectlTx,
                body: this.messagetext,
                to: [this.emailTx],
                cc: [this.emailTx],
                bcc: [this.emailTx],
                attachments: [
                    {
                        fileName: 'attachment.png',
                        path: '',
                        mimeType: 'image/png'
                    }]
            }).then(
            function() {
                console.log("Email composer closed -> DONE");
            }, function(err) {
                console.log("Error: " + err);
            });
        });
     
        
    }
}

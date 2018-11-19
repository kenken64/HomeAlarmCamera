import { Component, OnInit } from "@angular/core";
import { DataService } from "../core/data.service";
import { alert } from "tns-core-modules/ui/dialogs";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    imageURL: string = 'https://dc6353db.ngrok.io';

    constructor(private data: DataService) {
        // Use the constructor to inject services.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
        this.imageURL = this.data.getLocalStorage("imageUrl");
        if(typeof(this.imageURL) !== 'undefined'){
            this.imageURL = this.imageURL.replace(/"/g, "");
        }
        
    }

    onTap(event){
        console.log(this.imageURL);
        this.data.removeLocalStorage("imageUrl");
        this.data.setLocalStorage("imageUrl", this.imageURL);
        let options = {
            title: "Settings",
            message: "Settings saved",
            okButtonText: "OK"
        };

        alert(options).then(() => {
            console.log("Settings saved");
        });
    }
}

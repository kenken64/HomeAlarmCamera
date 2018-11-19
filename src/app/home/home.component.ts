import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataService } from "../core/data.service";
import { HttpResponse } from "tns-core-modules/http";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items = [];

    constructor(private itemService: DataService, private router: RouterExtensions) { }

    refreshList(args) {
        var pullRefresh = args.object;
        this.items = [];
        this.retrieveAllImages();
        pullRefresh.refreshing = false;
    }

    ngOnInit(): void {
        this.retrieveAllImages();
    }

    retrieveAllImages(){
        this.itemService.getAllImages().then((response: HttpResponse)=>{
            
            const str = response.content.toString();
            console.log(response.content);
            console.log(str);
            let startUL = str.indexOf('<pre>');
            let endUL = str.indexOf('</pre>');
            let value = str.substring(startUL, endUL);
            let tokenValues= value.split('<a href="');
            console.log(tokenValues);
            tokenValues.shift();
            tokenValues.shift();
            for (let x = 0 ; x < tokenValues.length; x++){
                let yy = tokenValues[x].split('">');
                this.items.push(yy[0]);
            }
            console.log(this.items);
        
        });
    }
}

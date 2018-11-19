import { Component, OnInit } from "@angular/core";
import { DataService } from "../core/data.service";

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    items = [];
    constructor(private data: DataService) {
        // Use the component constructor to inject providers.
    }

    retrieveAllAlerts(){
        let x = this.data.getLocalStorage("emailSent");
        if(typeof(x) !== 'undefined'){
            let yy = JSON.parse(x);
            for(let zy=0; zy < yy.length; zy++){
                console.log(yy[zy]);
                this.items.push(yy[zy]);
            }
        }
    }

    refreshList(args) {
        var pullRefresh = args.object;
        this.items = [];
        this.retrieveAllAlerts();
        pullRefresh.refreshing = false;
    }

    ngOnInit(): void {
        console.log("BrowseComponent");
        this.retrieveAllAlerts();
        console.log(this.items);
    }
}

import { Injectable } from "@angular/core";
import { request } from "tns-core-modules/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export interface IDataItem {
    id: number;
    name: string;
    description: string;
}

@Injectable({
    providedIn: "root"
})
export class DataService {
    constructor(private http: HttpClient){

    }
    getAllImages() {
        return request({
            url: "https://dc6353db.ngrok.io",
            method: "GET"
        })
    }

    loadImage(imgUrl: string) {
        console.log(imgUrl);
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "blob");
        return this.http.get(imgUrl, {responseType: 'blob', headers: headers});
    }
}

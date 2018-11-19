import { Injectable } from "@angular/core";
import { request } from "tns-core-modules/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable({
    providedIn: "root"
})
export class DataService {
    constructor(private http: HttpClient){

    }

    getAllImages() {
        let imageUrl = appSettings.getString('imageUrl');
        console.log("1>>>> " + imageUrl);
        if (!Array.isArray(imageUrl) || !imageUrl.length) {
            imageUrl = appSettings.getString('imageUrl');
        }else{
            if(typeof(imageUrl) !== 'undefined'){
                console.log("2>>>> " + typeof(imageUrl));
                imageUrl = imageUrl[0].replace(/"/g, "");
            }
        }
        
        if(typeof(imageUrl) === 'string'){
            console.log("3>>>> " + typeof(imageUrl));
            console.log(imageUrl)
            imageUrl = imageUrl.replace(/"/g, "");
        }
        return request({
            url: imageUrl,
            method: "GET"
        })
    }

    loadImage(imgUrl: string) {
        console.log(imgUrl);
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "blob");
        return this.http.get(imgUrl, {responseType: 'blob', headers: headers});
    }

    getLocalStorage(key: string){
        return appSettings.getString(key);
    }

    setLocalStorage(key: string, value: string){
        appSettings.setString(key, JSON.stringify(value));
        
    }

    removeLocalStorage(key: string){
        appSettings.remove(key);
        
    }
}

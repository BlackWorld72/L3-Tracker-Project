import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

var key = "rNf8JAw4dCcxLPcvH8k28sosD" as const
var keySecret = "cZGvl0lF9NrG6whICkQzhKuTa0oOpnIO8Gqteljksd8z5msFSw" as const
var token = "1560250255-KKjRvNuVxFRjKA6CMFROfXdzRiIsA0mK2hJbp2D" as const
var tokenSecret = "cloxd1SOYXCrDVmOaF9LGd2CHyg4iAkBP0Hag8uWcSopL" as const

@Component({
  selector: 'app-twitter-api',
  templateUrl: './twitter-api.component.html',
  styleUrls: ['./twitter-api.component.css']
})
export class TwitterApiComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLoLID()
  }

  getLoLID(): String {
    let a = this.http.get("https://api.twitter.com/2/tweets?ids=1228393702244134912,1227640996038684673,1199786642791452673&tweet.fields=created_at&expansions=author_id&user.fields=created_at")
    let s = ""

    console.log(a)

    return s
  }
}

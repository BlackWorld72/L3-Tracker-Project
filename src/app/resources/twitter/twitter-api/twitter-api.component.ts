import { Component, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Tweet, TweetByUserID, UserDataByUsername, UserData } from '../../../interfaces/twitter'

const httpHeader = {
  headers: new HttpHeaders({
    "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAMPDNwEAAAAAVt%2Bkh7v3R%2FGZl3akaQff8LOfYec%3DTF1QkplrOliKlEe3Gvj89mDrNdbNAJ1lNnRcbsxIiPf9Xna31o"
  })
}

@Component({
  selector: 'app-twitter-api',
  templateUrl: './twitter-api.component.html',
  styleUrls: ['./twitter-api.component.css']
})
export class TwitterApiComponent implements OnInit {

  lolTweets: Tweet[] = new Array<Tweet>()


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLoLID()
  }

  /**
   * Permet de récupéré l'ID twitter du compte @LeagueOfLegends
   */
  getLoLID(): void {
    this.http.get<any>("https://cors-anywhere.herokuapp.com/" + "https://api.twitter.com/2/users/by/username/LeagueOfLegends", httpHeader).pipe(map((value: UserDataByUsername) => { return value})).subscribe((res: UserDataByUsername) => {
      this.getLoLTweets(res.data.id)
    })
  }

  /**
   * Permet de récupéré les tweets du compte rentrer en parametre
   * @param id 
   */
  getLoLTweets(id: string): void {
    this.http.get<any>("https://cors-anywhere.herokuapp.com/" + "https://api.twitter.com/2/users/" + id + "/tweets?max_results=15", httpHeader).pipe(map((value: TweetByUserID) => { return value})).subscribe((res: TweetByUserID) => {
      this.lolTweets = res.data
    })
  }
}

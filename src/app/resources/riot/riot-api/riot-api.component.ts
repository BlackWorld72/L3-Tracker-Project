import { Component, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { LolSummoners, LolRotation, LoLMatches, LoLMatch, LoLRank} from '../../../interfaces/lol'
import { map } from 'rxjs/operators'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as champion from '../../../../assets/champion.json'
import * as icons from '../../../../assets/profileicon.json'

var apiBaseUrl = ".api.riotgames.com/lol/" as const

const httpHeader = {
  headers: new HttpHeaders({
    "X-Riot-Token": "RGAPI-cbcbf491-9d98-416e-9f77-90bf5eaa29c9"
  })
}

@Component({
  selector: 'app-riot-api',
  templateUrl: './riot-api.component.html',
  styleUrls: ['./riot-api.component.css']
})
export class RiotApiComponent implements OnInit {

  faSearch = faSearch
  rota: LolRotation
  username: string = ''
  userIconID: number = -1
  userIcon: string = ''
  userAccountID: string = ''
  userID: string = ''
  niveau: number = 0
  rank: LoLRank
  rankRatio: number = 0
  hasRank: boolean = false
  matches: LoLMatch[]
  region: string = 'world'

  constructor(private http: HttpClient) {
    this.rota = new LolRotation
    this.rank = new LoLRank
    this.matches = new Array<LoLMatch>()
  }

  ngOnInit(): void {
    this.getRotation().subscribe((res: LolRotation) => {
      this.rota = res
    })
  }

  getMatches() {
    if (this.region == 'world') {
      return;
    }
    this.http.get<any>("https://" + this.region + apiBaseUrl + "match/v4/matchlists/by-account/" + this.userAccountID + "?endIndex=10&", httpHeader).pipe( map((value: LoLMatches) => { return value})).subscribe((res: LoLMatches) => {
      this.matches = res.matches  
    })
  }

  getUserInfos() {
    let a = this.getUuid(this.username)
    if (a == null) {
      return;
    }
    a.subscribe((res: LolSummoners) => { 
      this.userIconID = res.profileIconId
      this.getIconImage(this.userIconID)
      this.userAccountID = res.accountId
      this.userID = res.id
      this.niveau = res.summonerLevel
    })
    this.getMatches()
    this.getRank()
  }

  getRank() {
    if (this.userID == '') {
      return;
    }
    this.http.get<any>("https://" + this.region + apiBaseUrl +  "league/v4/entries/by-summoner/" + this.userID, httpHeader).pipe( map((value: LoLRank[]) => { return value})).subscribe((res: LoLRank[]) => {
      if (res.length >= 1) {
        this.rank = res[0]
        this.hasRank = true
        this.rankRatio = Math.floor(((this.rank.wins) * 100)/(this.rank.wins + this.rank.losses))
      }
      else {
        this.hasRank = false
      }
      
    })
    console.log(this.rank)
  }

  onKey(event: any) {
    this.username = event.target.value
  }

  getIconImage(id: number): void {

    if (id == -1) {
      this.userIcon = ''
      return;
    }
    let img = ''

    let a = JSON.parse(JSON.stringify(icons.data))
    for (var index in a) {      
      if (id == a[index].id) {
        img = a[index].image.full
        break
      }
    }

    if (img == '') {
      this.userIcon = ''
      return;
    }
    
    this.userIcon = "http://ddragon.leagueoflegends.com/cdn/11.7.1/img/profileicon/" + img
  }

  onRegionChange(event: any) {
    this.region = event.target.value
  }

  getUuid(name: string): Observable<LolSummoners> | null {
    if (this.region == 'world') {
      return null
    }
    if (name == '') {
      return null 
    }
    return this.http.get<any>("https://" + this.region + apiBaseUrl + "summoner/v4/summoners/by-name/" + name, httpHeader).pipe(map((value: LolSummoners) => {return value}))
  }

  doNothing() {
    
  }

  //Rotation

  getRotation(): Observable<LolRotation> {
    return this.http.get<any>("https://euw1" + apiBaseUrl + "platform/v3/champion-rotations", httpHeader).pipe( map((value: LolRotation) => { return value}))
  }

  getChampionImage(id: number): String {
    let img

    let a = JSON.parse(JSON.stringify(champion.data))

    for (var index in a) {
      if (id == a[index].key) {
        img = a[index].image.full
        break
      }
    }

    return "http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/" + img
  }

  getChampionNom(id: number): String {
    let a = JSON.parse(JSON.stringify(champion.data))

    for (var index in a) {
      if (id == a[index].key) {
        return a[index].name
      }
    }
    return ""
  }
}

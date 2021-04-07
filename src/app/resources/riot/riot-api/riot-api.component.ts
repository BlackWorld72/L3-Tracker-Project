import { Component, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { LolSummoners, LolRotation, LoLMatches, LoLMatch, LoLRank, MatchDto} from '../../../interfaces/lol'
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

  kill: number = 0
  death: number = 0
  assist: number = 0

  username: string = ''
  name: string = ''
  userIconID: number = -1
  userIcon: string = ''
  userAccountID: string = ''
  userID: string = ''
  niveau: number = 0
  rank: LoLRank
  rankRatio: number = 0
  hasRank: boolean = false
  isUnrank: boolean = false
  matches: LoLMatch[]
  region: string = 'world'

  lanePrefere: string = ""

  constructor(private http: HttpClient) {
    this.rota = new LolRotation
    this.rank = new LoLRank
    this.matches = new Array<LoLMatch>()
  }

  ngOnInit(): void {
    this.getRotation()
  }

  /**
   * Permet de récupéré les 10 derniers matchs de l'utilisateur
   * @param uaID 
   * @returns 
   */
  getMatches(uaID: string) {
    this.http.get<any>("https://" + this.region + apiBaseUrl + "match/v4/matchlists/by-account/" + uaID + "?endIndex=5&", httpHeader).pipe( map((value: LoLMatches) => { return value})).subscribe((res: LoLMatches) => {
      this.calcMatches(res.matches)
    })
  }

  /**
   * Permet de réaliser des calculs sur les matches
   * @param matches 
   */
  calcMatches(matches: LoLMatch[]): void {
    var pos = [0, 0, 0, 0]
    var kill = 0
    var death = 0
    var assist = 0
    var index = 0;
    var p = 0

    for (var i in matches) {
      p++
      this.http.get<any>("https://" + this.region + apiBaseUrl + "match/v4/matches/" + matches[i].gameId, httpHeader).pipe( map((value: MatchDto) => { return value})).subscribe((res: MatchDto) => { 
        for (let k = 0 ; k < 10 ; k++) {
          if (res.participantIdentities[k].player.accountId == this.userAccountID) {
            index = k
          }
        }
        kill += res.participants[index].stats.kills
        death += res.participants[index].stats.deaths
        assist += res.participants[index].stats.assists
        if (p == 5) {
          this.kill = kill/5
          this.death = death/5
          this.assist = assist/5
        }
      })
      console.log("Kill = " + kill)
      switch(matches[i].lane) {
        case "BOTTOM":
          pos[0]++
          break;
        case "JUNGLE":
          pos[1]++
          break;
        case "MID":
          pos[2]++
          break;
        case "TOP":
          pos[3]++
          break;
        default:
          break;
      }
    }

    var max = 0;
    var indexMax = 0;

    for (var j = 0 ; j < 4 ; j++) {
      if (pos[j] > max) {
        max = pos[j]
        indexMax = j
      }
    }

    switch(indexMax) {
      case 0:
        this.lanePrefere = "Bot"
        break;
      case 0:
        this.lanePrefere = "Jungle"
        break;
      case 0:
        this.lanePrefere = "Mid"
        break;
      case 0:
        this.lanePrefere = "Top"
        break;
      default:
        break;
    }
  }

  /**
   * Permet de récupéré les informations du joueur
   * @returns 
   */
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
      this.name = res.name
      this.niveau = res.summonerLevel
      this.getRank(this.userID)
      this.getMatches(this.userAccountID)
    })
  }

  /**
   * Permet de récupéré le rank (ou le non rank) d'un joueur
   * @param userID 
   * @returns 
   */
  getRank(userID: string) {
    if (this.userID == '') {
      return;
    }
    this.http.get<any>("https://" + this.region + apiBaseUrl +  "league/v4/entries/by-summoner/" + userID, httpHeader).pipe( map((value: LoLRank[]) => { return value})).subscribe((res: LoLRank[]) => {
      if (res.length >= 1) {
        this.rank = res[0]
        this.isUnrank = false
        this.hasRank = true
        this.rankRatio = Math.floor(((this.rank.wins) * 100)/(this.rank.wins + this.rank.losses))
      }
      else {
        this.hasRank = false
        this.isUnrank = true
      }
    })
  }

  /**
   * Méthode utiliser lorsque l'on écrit dans l'entry du nom d'utilisateur
   * @param event 
   */
  onKey(event: any) {
    this.username = event.target.value
  }

  /**
   * Permet de récupéré une icon de joueur via l'id de celle ci
   * @param id 
   * @returns 
   */
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

  /**
   * Permet de changer la région dans le programme quand l'utilisateur la change sur la page
   * @param event 
   */
  onRegionChange(event: any) {
    this.region = event.target.value
  }

  /**
   * Permet de récupéré l'UUID d'un joueur
   * Vérifie également que l'entré n'est pas vide et que le monde n'est pas null
   * @param name 
   * @returns 
   */
  getUuid(name: string): Observable<LolSummoners> | null {
    if (this.region == 'world') {
      return null
    }
    if (name == '') {
      return null 
    }
    return this.http.get<any>("https://" + this.region + apiBaseUrl + "summoner/v4/summoners/by-name/" + name, httpHeader).pipe(map((value: LolSummoners) => {return value}))
  }

  /**
   * Permet de récupéré les champions de rotation
   */
  getRotation(): void {
    this.http.get<any>("https://euw1" + apiBaseUrl + "platform/v3/champion-rotations", httpHeader).pipe( map((value: LolRotation) => { return value})).subscribe((res: LolRotation) => {
      this.rota = res
    })
  }

  /**
   * Permet de récupéré une immage d'un champion via son id
   * @param id 
   * @returns 
   */
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

  /**
   * Permet de récupéré le nom d'un champion via son id
   * @param id 
   * @returns 
   */
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

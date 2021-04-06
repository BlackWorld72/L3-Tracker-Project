export class LolSummoners {
    "id": string
    "accountId": string
    "puuid": string
    "name": string
    "profileIconId": number
    "revisionDate": number
    "summonerLevel": number
}

export class LolRotation {
    "freeChampionIds": Array<number>
    "freeChampionIdsForNewPlayers": Array<number>
    "maxNewPlayerLevel": number
}

export class LoLMatch {
    "platformId": string
    "gameId": number
    "champion": number
    "queue": number
    "season": number
    "timestamp": number
    "role": string
    "lane": string
}

export class LoLMatches {
    "matches": Array<LoLMatch>
}

export class LoLRank {
    "leagueId": string
    "queueType": string
    "tier": string
    "rank": string
    "summonerId": string
    "summonerName": string
    "leaguePoints": number
    "wins": number
    "losses": number
    "veteran": boolean
    "inactive": boolean
    "freshBlood": boolean
    "hotStreak": boolean
}
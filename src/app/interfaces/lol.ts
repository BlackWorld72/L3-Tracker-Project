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

export class PlayerDto {
    "profileIcon":	number	
    "accountId":	string
    "matchHistoryUri":	string	
    "currentAccountId":	string
    "currentPlatformId":	string
    "summonerName":	string	
    "summonerId":	string
    "platformId": string
}

export class ParticipantIdentityDto {
    "participantId":	number	
    "player":	PlayerDto
}

export class TeamBansDto {
    "championId":	number	
    "pickTurn":	number
}

export class TeamStatsDto {
    "towerKills":	number
    "riftHeraldKills":	number	
    "firstBlood":	boolean
    "inhibitorKills":	number	
    "bans":	Array<TeamBansDto>
    "firstBaron":	boolean
    "firstDragon":	boolean	
    "dominionVictoryScore":	number
    "dragonKills":	number	
    "baronKills":	number	
    "firstInhibitor":	boolean	
    "firstTower":	boolean	
    "vilemawKills":	number	
    "firstRiftHerald":	boolean	
    "teamId":	number	
    "win":	string
}

export class RuneDto {
    "runeId":	number	
    "rank":	number
}

export class ParticipantStatsDto {
    "item0":	number	
    "item2":	number	
    "totalUnitsHealed":	number	
    "item1":	number	
    "largestMultiKill":	number	
    "goldEarned":	number	
    "firstInhibitorKill":	boolean	
    "physicalDamageTaken":	number	
    "nodeNeutralizeAssist":	number	
    "totalPlayerScore":	number	
    "champLevel":	number	
    "damageDealtToObjectives":	number	
    "totalDamageTaken":	number	
    "neutralMinionsKilled":	number	
    "deaths":	number	
    "tripleKills":	number	
    "magicDamageDealtToChampions":	number	
    "wardsKilled":	number	
    "pentaKills":	number	
    "damageSelfMitigated":	number	
    "largestCriticalStrike":	number	
    "nodeNeutralize":	number	
    "totalTimeCrowdControlDealt":	number	
    "firstTowerKill":	boolean	
    "magicDamageDealt":	number	
    "totalScoreRank":	number	
    "nodeCapture":	number	
    "wardsPlaced":	number	
    "totalDamageDealt":	number	
    "timeCCingOthers":	number	
    "magicalDamageTaken":	number	
    "largestKillingSpree":	number	
    "totalDamageDealtToChampions":	number	
    "physicalDamageDealtToChampions":	number	
    "neutralMinionsKilledTeamJungle":	number	
    "totalMinionsKilled":	number	
    "firstInhibitorAssist":	boolean	
    "visionWardsBoughtInGame":	number	
    "objectivePlayerScore":	number	
    "kills":	number	
    "firstTowerAssist":	boolean	
    "combatPlayerScore":	number	
    "inhibitorKills":	number	
    "turretKills":	number	
    "participantId":	number	
    "trueDamageTaken":	number	
    "firstBloodAssist":	boolean	
    "nodeCaptureAssist":	number	
    "assists":	number	
    "teamObjective":	number	
    "altarsNeutralized":	number	
    "goldSpent":	number	
    "damageDealtToTurrets":	number	
    "altarsCaptured":	number	
    "win":	boolean	
    "totalHeal":	number	
    "unrealKills":	number	
    "visionScore":	number	
    "physicalDamageDealt":	number	
    "firstBloodKill":	boolean	
    "longestTimeSpentLiving":	number	
    "killingSprees":	number	
    "sightWardsBoughtInGame":	number	
    "trueDamageDealtToChampions":	number	
    "neutralMinionsKilledEnemyJungle":	number	
    "doubleKills":	number	
    "trueDamageDealt":	number	
    "quadraKills":	number	
    "item4":	number	
    "item3":	number	
    "item6":	number	
    "item5":	number	
    "playerScore0":	number	
    "playerScore1":	number	
    "playerScore2":	number	
    "playerScore3":	number	
    "playerScore4":	number	
    "playerScore5":	number	
    "playerScore6":	number	
    "playerScore7":	number	
    "playerScore8":	number	
    "playerScore9":	number	
    "perk0":	number	
    "perk0Var1":	number	
    "perk0Var2":	number
    "perk0Var3":	number 
    "perk1":	number	
    "perk1Var1":	number	
    "perk1Var2":	number
    "perk1Var3":	number	
    "perk2":	number	
    "perk2Var1":	number
    "perk2Var2":	number	
    "perk2Var3":	number	
    "perk3":	number
    "perk3Var1":	number	
    "perk3Var2":	number
    "perk3Var3":	number
    "perk4":	number
    "perk4Var1":	number	
    "perk4Var2":	number	
    "perk4Var3":	number	
    "perk5":	number	
    "perk5Var1":	number	
    "perk5Var2":	number	
    "perk5Var3":	number	
    "perkPrimaryStyle":	number	
    "perkSubStyle":	number	
    "statPerk0":	number	
    "statPerk1":	number	
    "statPerk2":	number
}

export class ParticipantTimelineDto {
    "participantId":	number	
    "csDiffPerMinDeltas":	[string, number]	
    "damageTakenPerMinDeltas":	[string, number]	
    "role":	string
    "damageTakenDiffPerMinDeltas":	[string, number]	
    "xpPerMinDeltas":	[string, number]	
    "xpDiffPerMinDeltas":	[string, number]	
    "lane":	string	
    "creepsPerMinDeltas":	[string, number]	
    "goldPerMinDeltas":	[string, number]
}

export class MasteryDto {
    "rank":	number	
    "masteryId":	number
}

export class ParticipantDto {
    "participantId":	number	
    "championId":	number	
    "runes":	Array<RuneDto>	
    "stats":	ParticipantStatsDto	
    "teamId":	number	
    "timeline":	ParticipantTimelineDto
    "spell1Id":	number	
    "spell2Id":	number	
    "highestAchievedSeasonTier":	string	
    "masteries": Array<MasteryDto>
}

export class MatchDto {
    "gameId": number	
    "participantIdentities": Array<ParticipantIdentityDto>
    "queueId": number	
    "gameType": string
    "gameDuration":	number	
    "teams":	Array<TeamStatsDto>
    "platformId":	string	
    "gameCreation":	number	
    "seasonId":	number	
    "gameVersion":	string	
    "mapId":	number	
    "gameMode":	string	
    "participants": Array<ParticipantDto>
}
export class Tweet {
    "id": string
    "text": string
}

export class TweetByUserID {
    "data": Array<Tweet>
}

export class UserData {
    "id": string
    "name": string
    "username": string
}

export class UserDataByUsername {
    "data": UserData
}
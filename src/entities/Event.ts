export class Event {

    constructor (
        public _id: string,
        public description: string,
        public userId: string,
        public dateTime: Date,
        public createdAt: Date
    ){}
}
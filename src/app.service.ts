import { Injectable } from '@nestjs/common';
import * as data from '../data.json';

// const userShape = {
//   "title": "Your next delivery for <cat names, separated by comma or 'and'>",
//   "message": "Hey <firstName>! In two days' time, we'll be charging you for your next order for <cat names, formatted as described below>'s fresh food.",
//   "totalPrice": <total price, calculated via the formula shown in a later section in this README>,
//   "freeGift": <true if the total price exceeds 120 pounds, otherwise false>
// }

type userData = {
  "title": string,
  "message": string,
  "totalPrice": number,
  "freeGift": Boolean,
};

const userShape = {
  "title": "",
  "message": "",
  "totalPrice": 0,
  "freeGift": false,
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUser( id: string ): any {
    let numbericId = parseInt(id, 10);
    let user: any = data[numbericId];
    
    if (!user) {
      console.log( 'user not found with numeric id', id );

      user = data.find(record => record?.id === id) || {};
    }

    return user;
  }
}

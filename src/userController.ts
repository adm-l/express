
interface User {
    name: string;
    age: number;
}
export class UserController {
    constructor() {
        console.log("hiiiiii");
    }
    
    

    async getUser(userName: User): Promise< {}> {
        for(let i=0;i<1000000000;i++)
        {}
              return userName
    }
}
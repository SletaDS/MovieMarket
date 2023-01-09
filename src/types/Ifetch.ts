import {IUser} from "./IUser";
import {IMovie} from "./IMovie";

export interface Ifetch{
    users:IUser[],
    movie:IMovie[]
}

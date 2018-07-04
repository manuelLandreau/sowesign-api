import {UserModel as User} from './user.model';

export class RdsModel {
    readonly id: number;
    readonly name: string;
    readonly document: any;
    readonly signataires: User[];
}

import {Document} from 'mongoose';
import {UserModel as User} from './user.model';

export interface Rds extends Document {
    readonly id: number;
    readonly name: string;
    readonly document: any;
    readonly signataires: User[];
}

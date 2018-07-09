import {Model} from 'mongoose';
import {Inject, Injectable} from '@nestjs/common';
import {Rds} from './interfaces/rds.interface';
import {RdsModel} from './models/rds.model';

@Injectable()
export class RdsService {

    constructor(@Inject('RdsModelToken') private readonly rdsModel: Model<Rds>) {}

    async create(rds: RdsModel): Promise<Rds> {
        const createdRds = new this.rdsModel(rds);
        return createdRds.save()
    }

    find(id = null): Promise<any> {
        if (id) {
            return this.rdsModel.findById(id).exec();
        }
        return this.rdsModel.find().exec();
    }

    async update(rds: RdsModel): Promise<Rds> {
        return await this.rdsModel.findByIdAndUpdate(rds.id, rds).exec();
    }

    async remove(id) {
        // todo: gerer message retour
        return await this.rdsModel.remove(id).exec();
    }
}

import {Model} from 'mongoose';
import {HttpService, Inject, Injectable} from '@nestjs/common';
import {Rds} from './interfaces/rds.interface';
import {RdsModel} from './models/rds.model';
import {RabbitMQClient} from '../amq/rabbitmq-client';
import {AMQService} from '../amq/amq.service';
import {AxiosResponse} from '@nestjs/common/http/interfaces/axios.interfaces';

interface User {
    id: number
    name: string
}

@Injectable()
export class RdsService {

    client: RabbitMQClient;

    constructor(@Inject('RdsModelToken') private readonly rdsModel: Model<Rds>,
                private readonly amqService: AMQService,
                private readonly http: HttpService,) {
        this.client = amqService.getClient();
    }

    async create(createRdsDto: RdsModel): Promise<Rds> {
        let rds = null;
        let message = null;
        this.http.get('http://utilisateurs/api/users').subscribe((user: AxiosResponse<User>) => {
            const createdRds = new this.rdsModel(createRdsDto);
            rds = createdRds.save().then(s => {
                this.count().then(q =>
                    message = {
                        cmd: 'delivery',
                        payload: {
                            user: {
                                id: user.data.id
                            },
                            tracking: {
                                uid: s._id,
                                name: s.name,
                                location: 'Paris',
                            }
                        }
                    });
            });
            this.client.sendSingleMessage(message, (err, result, disposed) => {
                console.log(err, result, disposed);
            });
        });
        return rds;
    }

    find(id = null): Promise<any> {
        if (id) {
            return this.rdsModel.findById(id).exec();
        }
        return this.rdsModel.find().exec();
    }

    async update(createRdsDto: RdsModel): Promise<Rds> {
        return await this.rdsModel.findByIdAndUpdate(createRdsDto.id, createRdsDto).exec();
    }

    async remove(id) {
        // todo: gerer message retour
        return await this.rdsModel.remove(id).exec();
    }
}

import {HttpModule, Module} from '@nestjs/common';
import {RdsController} from './rds.controller';
import {RdsService} from './rds.service';
import {DatabaseModule} from '../database/database.module';
import {rdsProviders} from './rds.providers';
import {AMQModule} from '../amq/amq.module';
import {AMQService} from '../amq/amq.service';

@Module({
    imports: [DatabaseModule, HttpModule],
    controllers: [RdsController],
    providers: [AMQService, RdsService, ...rdsProviders],
})
export class RdsModule {
}

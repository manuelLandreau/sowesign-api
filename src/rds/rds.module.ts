import {HttpModule, Module} from '@nestjs/common';
import {RdsController} from './rds.controller';
import {RdsService} from './rds.service';
import {DatabaseModule} from '../database/database.module';
import {rdsProviders} from './rds.providers';

@Module({
    imports: [DatabaseModule, HttpModule],
    controllers: [RdsController],
    providers: [RdsService, ...rdsProviders],
})
export class RdsModule {
}

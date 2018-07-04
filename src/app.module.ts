import {Module} from '@nestjs/common';
import {RdsModule} from './rds/rds.module';

@Module({
    imports: [RdsModule],
})
export class AppModule {
}

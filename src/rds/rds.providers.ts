import {Connection} from 'mongoose';
import {RdsSchema} from './schemas/rds.schema';

export const rdsProviders = [
    {
        provide: 'RdsModelToken',
        useFactory: (connection: Connection) =>
            connection.model('Rds', RdsSchema),
        inject: ['DbConnectionToken'],
    },
];

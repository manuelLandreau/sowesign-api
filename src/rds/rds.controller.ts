import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {RdsModel} from './models/rds.model';
import {Rds} from './interfaces/rds.interface';
import {RdsService} from './rds.service';
import {UserModel} from './models/user.model';

@Controller('rds')
export class RdsController {
    constructor(private readonly rdsService: RdsService) {
    }

    @Post('/:id')
    async sign(id, @Body() User: UserModel): Promise<Rds> {
        const rds = this.rdsService.find(id);
        rds.signataires.push(User);
        return rds
    }

    @Post()
    async create(@Body() createRdsDto: RdsModel) {
        this.rdsService.create(createRdsDto);
    }

    @Get()
    async findAll(): Promise<Rds[]> {
        return this.rdsService.find();
    }

    @Get('/:id')
    async findOne(id): Promise<Rds> {
        return this.rdsService.find(id);
    }

    @Put('/:id')
    async update(@Body() createRdsDto: RdsModel): Promise<Rds> {
        return this.rdsService.update(createRdsDto);
    }

    @Delete('/:id')
    remove(id): object {
        this.rdsService.remove(id);
        return {message: `Rds ${id} removed successfully`};
    }
}

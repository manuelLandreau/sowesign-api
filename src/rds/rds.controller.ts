import {Body, Controller, Delete, FileInterceptor, Get, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {RdsModel} from './models/rds.model';
import {Rds} from './interfaces/rds.interface';
import {RdsService} from './rds.service';
import {UserModel} from './models/user.model';
import {extractTags, sign} from '../helpers/pdf.helper';

@Controller('rds')
export class RdsController {
    constructor(private readonly rdsService: RdsService) {
    }

    @Post('/sign')
    @UseInterceptors(FileInterceptor('file'))
    async sign(@Body() user: UserModel, @UploadedFile() file) {
        const rds = this.rdsService.find(user.rdsId);
        user.signature = file;
        rds.signataires.push(user);
        const tag = extractTags(rds.document)[0];
        rds.document = sign(rds.document, file, tag);
        console.log('pdf signed');
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() rds: RdsModel, @UploadedFile() file): Promise<Rds> {
        rds.document = file;
        return this.rdsService.create(rds);
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

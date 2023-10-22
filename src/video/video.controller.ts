import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    InternalServerErrorException,
    HttpException,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { video } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('video')
@Controller('video')
export class VideoController {
    constructor(
        private readonly videoService: VideoService,
        private configService: ConfigService,
    ) {}

    @Post()
    create(@Body() createVideoDto: CreateVideoDto) {
        return this.videoService.create(createVideoDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(): Promise<video[]> {
        try {
            console.log(this.configService.get('DATABASE_URL'));
            return this.videoService.findAll();
        } catch (exception) {
            if (exception.statusCode != 500) {
                throw new HttpException('Looix', 400);
            }
            throw new InternalServerErrorException();
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.videoService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
        return this.videoService.update(+id, updateVideoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.videoService.remove(+id);
    }
}

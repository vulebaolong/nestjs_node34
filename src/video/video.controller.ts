import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { video } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

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

    @Get()
    findAll(): Promise<video[]> {
        console.log(this.configService.get('DATABASE_URL'));
        return this.videoService.findAll();
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

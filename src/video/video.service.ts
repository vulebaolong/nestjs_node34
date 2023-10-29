import { Injectable, Req, Request } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaClient, video } from '@prisma/client';

@Injectable()
export class VideoService {
    private prisma = new PrismaClient();

    create(createVideoDto: CreateVideoDto) {
        console.log(createVideoDto);
        return 'This action adds a new video';
    }

    async findAll(): Promise<video[]> {
        return await this.prisma.video.findMany();
    }

    findOne(id: number) {
        return `This action returns a #${id} video`;
    }

    update(id: number, updateVideoDto: UpdateVideoDto) {
        console.log(updateVideoDto);
        return `This action updates a #${id} video`;
    }

    remove(id: number) {
        return `This action removes a #${id} video`;
    }
}

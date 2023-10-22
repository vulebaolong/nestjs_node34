import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Headers,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { ApiTags, ApiProperty, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadAvatarDto } from './dto/upload-avatar.dto';

class bodyType {
    @ApiProperty()
    userId: string;
}

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: UploadAvatarDto,
    })
    @UseInterceptors(
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: process.cwd() + '/public/img',
                filename: (req, file, callback) =>
                    callback(
                        null,
                        new Date().getTime() + '_' + file.originalname,
                    ),
            }),
        }),
    )
    @Post('/upload-avatar')
    updaloadAvatar(@UploadedFile() file: Express.Multer.File) {
        // delete file
        fs.unlink(
            process.cwd() + '/public/img/1697960281149_meo.png',
            (err) => {
                if (err) throw err;
                console.log(' was deleted');
            },
        );
        return file;
    }

    @Post()
    create(@Body() createUserDto: bodyType, @Headers('token') token: string) {
        console.log(token);
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}

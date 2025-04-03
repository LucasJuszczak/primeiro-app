import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { GuestsService } from "./guests.service";
import { CreateGuestDto } from "./dto/create-guest.dto";
import { UpdateGuestDto } from "./dto/update-guest.dto";


@Controller('guests')
export class GuestsController {
    constructor(private readonly guestsService: GuestsService) {}

    @Get()
    findAllGuests(){
        return this.guestsService.findAll()
    }

    @Get(':id')
    findOneGuest(@Param('id', ParseIntPipe) id: number){
        return this.guestsService.findOne(id)
    }

    @Post()
    createGuest(@Body() createGuestDto: CreateGuestDto){
        return this.guestsService.create(createGuestDto)
    }

    @Patch(':id')
    updateGuest(@Param('id', ParseIntPipe) id: number, @Body() updateGuestDto: UpdateGuestDto){
        return this.guestsService.update(id, updateGuestDto)
    }

    @Delete(':id')
    removeGuest(@Param('id') id: number){
        return this.guestsService.remove(id)
    }
}
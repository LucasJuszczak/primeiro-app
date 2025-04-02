import { PartialType } from "@nestjs/mapped-types"
import { CreateGuestDto } from "./create-guest.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateGuestDto extends PartialType(CreateGuestDto){

    @IsBoolean()
    @IsOptional()
    readonly presence?: boolean
}
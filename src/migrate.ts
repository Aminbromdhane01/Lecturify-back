import { NestFactory } from "@nestjs/core";
import { DataBaseModule } from "./database/database.module";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { getOrmOptions } from "./database/data-source";
async function bootstrap() {

    const migarate = await NestFactory.create(DataBaseModule)
    const configService = migarate.get(ConfigService)
    const dataoptions = getOrmOptions(configService)
    console.log(dataoptions);

    const dataSource = new DataSource(dataoptions)
    return dataSource
}
export default bootstrap()


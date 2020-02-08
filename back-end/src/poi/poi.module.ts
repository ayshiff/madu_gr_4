import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PoiService } from './poi.service';
import { PoiController } from './poi.controller';
import { PoiSchema } from "./schemas/poi.schema";

@Module({
    imports: [
      MongooseModule.forFeatureAsync([
        {
          name: 'Poi',
          useFactory: () => {
            const schema = PoiSchema;
            schema.pre(/^find/, function(next) {
              this.select({ _id: 0, __v: 0 });
              next();
            });
            return schema;
          },
        },
      ])
    ],
    providers: [PoiService],
    controllers: [PoiController]
  })
export class PoiModule {}

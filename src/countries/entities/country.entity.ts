import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';
import { Platform } from '../../platforms/entities/platform.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid', { name: 'country_id' })
  id!: string;

  @Column({ name: 'country_name', length: 100, unique: true })
  name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => Manufacturer, (manufacturer) => manufacturer.country)
  manufacturers?: Manufacturer[];

  @OneToMany(() => Platform, (platform) => platform.country)
  platforms?: Platform[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';
import { Platform } from '../../platforms/entities/platform.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn({ name: 'country_id' })
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ name: 'iso_code', length: 3, unique: true, nullable: true })
  isoCode?: string;

  @OneToMany(() => Manufacturer, (manufacturer) => manufacturer.headquartersCountry)
  manufacturers?: Manufacturer[];

  @OneToMany(() => Platform, (platform) => platform.originCountry)
  platforms?: Platform[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Manufacturer, (m) => m.country)
  manufacturers: Manufacturer[];
}

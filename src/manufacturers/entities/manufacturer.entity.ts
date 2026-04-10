import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Platform } from '../../platforms/entities/platform.entity';

@Entity('manufacturers')
export class Manufacturer {
  @PrimaryGeneratedColumn('uuid', { name: 'manu_id' })
  id!: string;

  @Column({ name: 'manu_name', length: 150 })
  name!: string;

  @Column({ length: 100, nullable: true })
  specialization?: string;

  @ManyToOne(() => Country, (country) => country.manufacturers, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'country_id' })
  country?: Country;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => Platform, (platform) => platform.manufacturer)
  platforms?: Platform[];
}

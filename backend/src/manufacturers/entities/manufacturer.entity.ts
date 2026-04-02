import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Platform } from '../../platforms/entities/platform.entity';

@Entity('manufacturers')
export class Manufacturer {
  @PrimaryGeneratedColumn({ name: 'man_id' })
  id!: number;

  @Column({ length: 150 })
  name!: string;

  @ManyToOne(() => Country, (country) => country.manufacturers, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'headquarters_country_id' })
  headquartersCountry?: Country;

  @Column({ length: 100, nullable: true })
  specialization?: string;

  @OneToMany(() => Platform, (platform) => platform.manufacturer)
  platforms?: Platform[];
}

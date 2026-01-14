import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Equipment } from '../../equipment/entities/equipment.entity';

@Entity('manufacturers')
export class Manufacturer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  name: string;

  @ManyToOne(() => Country, (c) => c.manufacturers, {
    onDelete: 'CASCADE',
  })
  country: Country;

  @Column({ nullable: true })
  foundedYear?: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Equipment, (e) => e.manufacturer)
  equipment: Equipment[];
}

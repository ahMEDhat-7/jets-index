import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';
import { EquipmentVariant } from '../../equipment-variants/entities/equipment-variant.entity';

export enum EquipmentCategory {
  FIGHTER_JET = 'fighter_jet',
  BOMBER = 'bomber',
  DRONE = 'drone',
  HELICOPTER = 'helicopter',
}

@Entity('equipment')
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  name: string;

  @Index()
  @Column({ type: 'enum', enum: EquipmentCategory })
  category: EquipmentCategory;

  @Column({ nullable: true })
  generation?: string;

  @Column({ nullable: true })
  primaryRole?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'jsonb', nullable: true })
  specs?: Record<string, any>;

  @Column({ type: 'text', array: true, nullable: true })
  advantages?: string[];

  @ManyToOne(() => Manufacturer, (m) => m.equipment, {
    onDelete: 'CASCADE',
  })
  manufacturer: Manufacturer;

  @OneToMany(() => EquipmentVariant, (v) => v.equipment)
  variants: EquipmentVariant[];
}

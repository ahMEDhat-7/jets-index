import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Equipment } from '../../equipment/entities/equipment.entity';

@Entity('equipment_variants')
export class EquipmentVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  role?: string;

  @ManyToOne(() => Equipment, (e) => e.variants, {
    onDelete: 'CASCADE',
  })
  equipment: Equipment;
}

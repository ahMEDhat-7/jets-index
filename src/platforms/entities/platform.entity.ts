import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';
import { Country } from '../../countries/entities/country.entity';

@Entity('platforms')
export class Platform {
  @PrimaryGeneratedColumn('uuid', { name: 'platform_id' })
  id!: string;

  @Column({ name: 'platform_name', length: 255 })
  name!: string;

  @Column({ name: 'platform_description', type: 'text', nullable: true })
  description?: string;

  @Column({
    name: 'unit_cost_usd',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  unitCostUsd?: number;

  @Column({ name: 'operational_status', length: 50, nullable: true })
  operationalStatus?: string;

  @Column({ name: 'technical_specs', type: 'jsonb', nullable: true })
  technicalSpecs?: object;

  @Column({ name: 'image_url', length: 512, nullable: true })
  imageUrl?: string;

  @ManyToOne(() => Category, (category) => category.platforms, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.platforms, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'manu_id' })
  manufacturer?: Manufacturer;

  @ManyToOne(() => Country, (country) => country.platforms, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'country_id' })
  country?: Country;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

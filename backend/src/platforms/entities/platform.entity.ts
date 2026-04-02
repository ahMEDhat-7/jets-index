import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';
import { Country } from '../../countries/entities/country.entity';
import { WeaponryDetails } from '../../weaponry-details/entities/weaponry-details.entity';

@Entity('platforms')
export class Platform {
  @PrimaryGeneratedColumn({ name: 'platform_id' })
  id!: number;

  @Column({ name: 'id_code', length: 20, unique: true, nullable: true })
  idCode?: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ name: 'type_description', type: 'text', nullable: true })
  typeDescription?: string;

  @ManyToOne(() => Category, (category) => category.platforms, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.platforms, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer?: Manufacturer;

  @ManyToOne(() => Country, (country) => country.platforms, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'origin_country_id' })
  originCountry?: Country;

  @Column({ name: 'unit_cost_usd', type: 'decimal', precision: 15, scale: 2, nullable: true })
  unitCostUsd?: string;

  @Column({ name: 'operational_status', length: 50, nullable: true })
  operationalStatus?: string;

  @Column({ name: 'technical_specs', type: 'jsonb', nullable: true })
  technicalSpecs?: object;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToOne(() => WeaponryDetails, (weaponryDetails) => weaponryDetails.platform)
  weaponryDetails?: WeaponryDetails;
}

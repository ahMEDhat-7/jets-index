import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Platform } from '../../platforms/entities/platform.entity';

@Entity('weaponry_details')
export class WeaponryDetails {
  @PrimaryColumn({ name: 'platform_id' })
  platformId!: number;

  @OneToOne(() => Platform, (platform) => platform.weaponryDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'platform_id' })
  platform!: Platform;

  @Column({ name: 'guidance_system', length: 100, nullable: true })
  guidanceSystem?: string;

  @Column({ name: 'warhead_type', length: 100, nullable: true })
  warheadType?: string;

  @Column({ name: 'effective_range_km', type: 'decimal', precision: 10, scale: 2, nullable: true })
  effectiveRangeKm?: string;
}

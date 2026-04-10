import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Platform } from '../../platforms/entities/platform.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'category_id' })
  id!: string;

  @Column({ name: 'category_name', length: 50 })
  categoryName!: string;

  @Column({ name: 'category_domain', length: 50, nullable: true })
  categoryDomain?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => Platform, (platform) => platform.category)
  platforms?: Platform[];
}

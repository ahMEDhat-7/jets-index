import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Platform } from '../../platforms/entities/platform.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'cat_id' })
  id!: number;

  @Column({ name: 'category_name', length: 50 })
  categoryName!: string;

  @Column({ length: 50, nullable: true })
  domain?: string;

  @OneToMany(() => Platform, (platform) => platform.category)
  platforms?: Platform[];
}

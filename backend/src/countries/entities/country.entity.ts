import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Platform } from './platform.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 3, unique: true })
  isoCode: string;

  //   @OneToMany(() => Platform, (platform) => platform.originCountry)
  //   platforms: Platform[];
}

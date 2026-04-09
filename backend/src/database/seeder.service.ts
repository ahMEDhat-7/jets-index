import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { Country } from '../countries/entities/country.entity';
import { Manufacturer } from '../manufacturers/entities/manufacturer.entity';
import { Category } from '../categories/entities/category.entity';
import { Platform } from '../platforms/entities/platform.entity';
import { Blog } from '../blogs/entities/blog.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    const userRepo = this.dataSource.getRepository(User);
    const userCount = await userRepo.count();

    if (userCount === 0) {
      console.log('🌱 Seeding database...');
      await this.seed();
      console.log('✅ Seeding complete!');
    }
  }

  private async seed() {
    const userRepo = this.dataSource.getRepository(User);
    const countryRepo = this.dataSource.getRepository(Country);
    const categoryRepo = this.dataSource.getRepository(Category);
    const manufacturerRepo = this.dataSource.getRepository(Manufacturer);
    const platformRepo = this.dataSource.getRepository(Platform);
    const blogRepo = this.dataSource.getRepository(Blog);

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = userRepo.create({
      email: 'admin@jetsindex.com',
      password: hashedPassword,
      role: UserRole.ADMIN,
    });
    await userRepo.save(adminUser);

    const regularUser = userRepo.create({
      email: 'user@jetsindex.com',
      password: hashedPassword,
      role: UserRole.USER,
    });
    await userRepo.save(regularUser);

    const countries = [
      { name: 'United States' },
      { name: 'Germany' },
      { name: 'France' },
      { name: 'China' },
      { name: 'Russia' },
      { name: 'United Kingdom' },
      { name: 'Turkey' },
    ];
    await countryRepo.save(countryRepo.create(countries));

    const categories = [
      { categoryName: 'Fighter Jet', categoryDomain: 'Air' },
      { categoryName: 'Tank', categoryDomain: 'Land' },
      { categoryName: 'Drone', categoryDomain: 'Air' },
      { categoryName: 'Naval Vessel', categoryDomain: 'Sea' },
      { categoryName: 'Missile System', categoryDomain: 'Defense' },
      { categoryName: 'Helicopter', categoryDomain: 'Air' },
    ];
    await categoryRepo.save(categoryRepo.create(categories));

    const us = await countryRepo.findOne({ where: { name: 'United States' } })!;
    const germany = await countryRepo.findOne({ where: { name: 'Germany' } })!;
    const france = await countryRepo.findOne({ where: { name: 'France' } })!;
    const uk = await countryRepo.findOne({
      where: { name: 'United Kingdom' },
    })!;
    const china = await countryRepo.findOne({ where: { name: 'China' } })!;
    const russia = await countryRepo.findOne({ where: { name: 'Russia' } })!;
    const turkey = await countryRepo.findOne({ where: { name: 'Turkey' } })!;

    const manufacturers = [
      {
        name: 'Lockheed Martin',
        specialization: 'Aerospace & Defense',
        country: us,
      },
      { name: 'Boeing Defense', specialization: 'Aerospace', country: us },
      {
        name: 'Airbus',
        specialization: 'Aircraft Manufacturing',
        country: france,
      },
      {
        name: 'Rheinmetall',
        specialization: 'Defense Systems',
        country: germany,
      },
      {
        name: 'BAE Systems',
        specialization: 'Defense & Security',
        country: uk,
      },
      { name: 'NORINCO', specialization: 'Military Equipment', country: china },
      {
        name: 'Almaz-Antey',
        specialization: 'Missile Systems',
        country: russia,
      },
      { name: 'Baykar', specialization: 'Drone Systems', country: turkey },
    ];
    await manufacturerRepo.save(manufacturerRepo.create(manufacturers as any));

    const fighterJet = await categoryRepo.findOne({
      where: { categoryName: 'Fighter Jet' },
    })!;
    const tank = await categoryRepo.findOne({
      where: { categoryName: 'Tank' },
    })!;
    const drone = await categoryRepo.findOne({
      where: { categoryName: 'Drone' },
    })!;
    const missile = await categoryRepo.findOne({
      where: { categoryName: 'Missile System' },
    })!;

    const lockheed = await manufacturerRepo.findOne({
      where: { name: 'Lockheed Martin' },
    })!;
    const boeing = await manufacturerRepo.findOne({
      where: { name: 'Boeing Defense' },
    })!;
    const rheinmetall = await manufacturerRepo.findOne({
      where: { name: 'Rheinmetall' },
    })!;
    const bae = await manufacturerRepo.findOne({
      where: { name: 'BAE Systems' },
    })!;
    const norinco = await manufacturerRepo.findOne({
      where: { name: 'NORINCO' },
    })!;
    const almaz = await manufacturerRepo.findOne({
      where: { name: 'Almaz-Antey' },
    })!;
    const baykar = await manufacturerRepo.findOne({
      where: { name: 'Baykar' },
    })!;

    const platforms = [
      {
        name: 'F-35 Lightning II',
        description: 'Stealth multirole fighter aircraft',
        unitCostUsd: 80000000,
        operationalStatus: 'Active',
        technicalSpecs: {
          max_speed: 'Mach 1.6',
          range_km: 2200,
          stealth: true,
        },
        imageUrl:
          'https://i.pinimg.com/1200x/68/04/9c/68049ca2369c6b5fb3495ed38a6ff02b.jpg',
        category: fighterJet,
        manufacturer: lockheed,
        country: us,
      },
      {
        name: 'Eurofighter Typhoon',
        description: 'Twin-engine multirole fighter',
        unitCostUsd: 90000000,
        operationalStatus: 'Active',
        technicalSpecs: { max_speed: 'Mach 2.0', range_km: 2900 },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/2/27/Eurofighter_Typhoon_in_flight.jpg',
        category: fighterJet,
        manufacturer: bae,
        country: uk,
      },
      {
        name: 'Leopard 2',
        description: 'Main battle tank',
        unitCostUsd: 6000000,
        operationalStatus: 'Active',
        technicalSpecs: { main_gun: '120mm', crew: 4 },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/5/5f/Leopard_2_A6.jpg',
        category: tank,
        manufacturer: rheinmetall,
        country: germany,
      },
      {
        name: 'M1A2 Abrams',
        description: 'Advanced main battle tank',
        unitCostUsd: 8500000,
        operationalStatus: 'Active',
        technicalSpecs: { main_gun: '120mm', crew: 4 },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/9e/M1A2_Abrams.jpg',
        category: tank,
        manufacturer: boeing,
        country: us,
      },
      {
        name: 'Bayraktar TB2',
        description: 'Medium-altitude long-endurance UAV',
        unitCostUsd: 5000000,
        operationalStatus: 'Active',
        technicalSpecs: { endurance_hours: 27, payload_kg: 150 },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/0/0c/Bayraktar_TB2.jpg',
        category: drone,
        manufacturer: baykar,
        country: turkey,
      },
      {
        name: 'Wing Loong II',
        description: 'Chinese UCAV drone',
        unitCostUsd: 2000000,
        operationalStatus: 'Active',
        technicalSpecs: { endurance_hours: 20, payload_kg: 400 },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/3/3a/Wing_Loong_II.jpg',
        category: drone,
        manufacturer: norinco,
        country: china,
      },
      {
        name: 'S-400 Triumf',
        description: 'Long-range air defense missile system',
        unitCostUsd: 500000000,
        operationalStatus: 'Active',
        technicalSpecs: { range_km: 400 },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/f/f3/S-400_Triumf.jpg',
        category: missile,
        manufacturer: almaz,
        country: russia,
      },
    ];
    await platformRepo.save(platformRepo.create(platforms as any));

    const blogs = [
      {
        title: 'The Rise of Stealth Technology',
        summary: 'How stealth changed air combat.',
        content:
          'Stealth technology has revolutionized modern warfare by reducing radar cross-section and enabling aircraft to operate undetected. From the F-117 Nighthawk to the F-22 Raptor and F-35 Lightning II, stealth aircraft have become the backbone of air superiority forces worldwide.',
      },
      {
        title: 'Modern Battle Tanks Overview',
        summary: 'A comparison of leading tanks.',
        content:
          'Modern battle tanks like the German Leopard 2, American M1A2 Abrams, and Russian T-90 represent the pinnacle of armored warfare. These vehicles feature advanced composite armor, digital fire control systems, and powerful 120mm smoothbore guns.',
      },
      {
        title: 'Drones in Modern Warfare',
        summary: 'The increasing role of UAVs.',
        content:
          'Unmanned Aerial Vehicles (UAVs) have transformed reconnaissance and strike capabilities. From the Turkish Bayraktar TB2 to the American MQ-9 Reaper, drones now play crucial roles in both surveillance and combat operations.',
      },
    ];
    await blogRepo.save(blogRepo.create(blogs));
  }
}

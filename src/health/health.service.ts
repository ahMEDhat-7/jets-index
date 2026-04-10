import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private dataSource: DataSource) {}

  async check() {
    let dbStatus = 'unhealthy';
    try {
      await this.dataSource.query('SELECT 1');
      dbStatus = 'healthy';
    } catch (e) {
      dbStatus = 'unhealthy';
    }

    return {
      status: dbStatus === 'healthy' ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: dbStatus,
        },
        api: {
          status: 'ok',
        },
      },
    };
  }
}

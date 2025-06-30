import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashtag } from './entities/hashtag.entity';

@Injectable()
export class HashtagsService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagsRepository: Repository<Hashtag>,
  ) {}

  async findAll(trending = false, limit = 20): Promise<Hashtag[]> {
    const queryBuilder = this.hashtagsRepository.createQueryBuilder('hashtag');
    
    if (trending) {
      queryBuilder.orderBy('hashtag.postsCount', 'DESC');
    } else {
      queryBuilder.orderBy('hashtag.name', 'ASC');
    }
    
    return queryBuilder.take(limit).getMany();
  }

  async findOne(name: string): Promise<Hashtag> {
    const hashtag = await this.hashtagsRepository.findOne({
      where: { name },
      relations: ['posts', 'posts.author'],
    });
    
    if (!hashtag) {
      throw new NotFoundException(`Hashtag #${name} not found`);
    }
    
    return hashtag;
  }

  async findOrCreate(name: string): Promise<Hashtag> {
    let hashtag = await this.hashtagsRepository.findOne({ where: { name } });
    
    if (!hashtag) {
      hashtag = this.hashtagsRepository.create({ name });
      await this.hashtagsRepository.save(hashtag);
    }
    
    return hashtag;
  }

  async findOrCreateMany(names: string[]): Promise<Hashtag[]> {
    const hashtags: Hashtag[] = [];
    
    for (const name of names) {
      // Normalize the hashtag name (lowercase, remove special chars)
      const normalizedName = name.toLowerCase().replace(/[^\w]/g, '');
      
      if (normalizedName) {
        const hashtag = await this.findOrCreate(normalizedName);
        hashtags.push(hashtag);
      }
    }
    
    return hashtags;
  }
}
import { Test, TestingModule } from '@nestjs/testing';
import { VenueResolver } from './venue.resolver';
import { VenueService } from './venue.service';

describe('VenueResolver', () => {
  let resolver: VenueResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VenueResolver, VenueService],
    }).compile();

    resolver = module.get<VenueResolver>(VenueResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

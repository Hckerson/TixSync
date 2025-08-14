import { Test, TestingModule } from '@nestjs/testing';
import { TickettypeResolver } from './tickettype.resolver';
import { TickettypeService } from './tickettype.service';

describe('TickettypeResolver', () => {
  let resolver: TickettypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TickettypeResolver, TickettypeService],
    }).compile();

    resolver = module.get<TickettypeResolver>(TickettypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

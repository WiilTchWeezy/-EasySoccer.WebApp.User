import { TestBed } from '@angular/core/testing';

import { SoccerPitchPlanService } from './soccer-pitch-plan.service';

describe('SoccerPitchPlanService', () => {
  let service: SoccerPitchPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoccerPitchPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

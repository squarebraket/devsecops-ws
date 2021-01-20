import { Test, TestingModule } from '@nestjs/testing';
import { FrequentFlyerController } from '../../src/ff/ff.controller';
import { FrequentFlyerService } from '../../src/ff/ff.service';

import { Before, Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';

let ffController: FrequentFlyerController;

Before(async () => {
  const ff: TestingModule = await Test.createTestingModule({
    controllers: [FrequentFlyerController],
    providers: [FrequentFlyerService],
  }).compile();

  ffController = ff.get<FrequentFlyerController>(FrequentFlyerController);
});

Given('user is not a Frequent Flyer member', function () {
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
});

When('user registers on the Frequent Flyer program', function () {
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
});

Then('user should have a status of BRONZE', function () {
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
});

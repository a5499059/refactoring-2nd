import { Province, sampleProvinceData } from "../../src/ch4/Province"

describe('province', function() {
    it('shortfall', function() {
      const asia = new Province(sampleProvinceData());
      expect(asia.shortfall).toBe(5);
    });
  });
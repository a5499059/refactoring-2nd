import { Province } from "../../src/ch4/Province"
import { sampleProvinceData } from "../../src/ch4/sampleProvinceData";

describe('province', function() {
    it('shortfall', function() {
      const asia = new Province(sampleProvinceData());
      expect(asia.shortfall).toBe(5);
    });
  });
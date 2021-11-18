import { getFormattedDateRange } from "./timelineUtils";

describe('timelineUtils.spec.ts',()=>{
  it('should get date formatted',()=>{
    expect(getFormattedDateRange(new Date('2020-01-01'), new Date('2021-08-27'))).toEqual('Jan 2020 – Aug 2021')
    expect(getFormattedDateRange(new Date('1997-12-15'), 'Today')).toEqual('Dec 1997 – Today')
  })
})

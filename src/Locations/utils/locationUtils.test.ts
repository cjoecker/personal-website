import { getYear } from 'date-fns';

import {
  abbreviateYear,
  addActualYearToLocations,
  getLastLocation,
  getWeatherImagePath,
  locationUtils,
  sortLocationsByYear,
} from './locationUtils';

const FAKE_TODAY = new Date('2021-06-01');

const LocationMock = {
  year: 1991,
  city: 'Bogotá',
  country: 'Colombia',
  latitude: 4.687175,
  longitude: -74.048476,
};

describe('getLocationMarks', () => {
  beforeEach(() =>
    jest.useFakeTimers('modern').setSystemTime(FAKE_TODAY.getTime())
  );
  it('should return location marks', () => {
    const Locations = [
      { ...LocationMock, year: 1991 },
      { ...LocationMock, year: 1992 },
      { ...LocationMock, year: 1993 },
      { ...LocationMock, year: 1997 },
      { ...LocationMock, year: 1998 },
      { ...LocationMock, year: 2007 },
      { ...LocationMock, year: 2019 },
      { ...LocationMock, year: 2020 },
      { ...LocationMock, year: 2021 },
    ];

    const LocationMockMarks = [
      { value: 1991, label: "'91" },
      { value: 1992, label: '' },
      { value: 1993, label: '' },
      { value: 1997, label: "'97" },
      { value: 1998, label: '' },
      { value: 2007, label: "'07" },
      { value: 2019, label: "'19" },
      { value: 2020, label: '' },
      { value: 2021, label: '' },
    ];

    expect(locationUtils(Locations)).toEqual(LocationMockMarks);
  });
});

describe('sortLocationsByYear', () => {
  it('should sort locations by year', () => {
    const Locations = [
      { ...LocationMock, year: 1999 },
      { ...LocationMock, year: 1992 },
      { ...LocationMock, year: 1993 },
      { ...LocationMock, year: 1991 },
    ];

    const sortedLocations = [
      { ...LocationMock, year: 1991 },
      { ...LocationMock, year: 1992 },
      { ...LocationMock, year: 1993 },
      { ...LocationMock, year: 1999 },
    ];

    expect(sortLocationsByYear(Locations)).toEqual(sortedLocations);
  });
});

describe('abbreviateYear', () => {
  it('should abbreviate year', () => {
    expect(abbreviateYear(2011)).toBe("'11");
    expect(abbreviateYear(1991)).toBe("'91");
  });
});

describe('add last year', () => {
  beforeEach(() =>
    jest.useFakeTimers('modern').setSystemTime(FAKE_TODAY.getTime())
  );

  it("should add actual year if it doesn't exist", () => {
    const Locations = [
      { ...LocationMock, year: 2000 },
      { ...LocationMock, year: 2005 },
      { ...LocationMock, year: 2020 },
    ];

    const newLocations = [
      { ...LocationMock, year: 2000 },
      { ...LocationMock, year: 2005 },
      { ...LocationMock, year: 2020 },
      { ...LocationMock, year: getYear(FAKE_TODAY) },
    ];

    expect(addActualYearToLocations(Locations)).toEqual(newLocations);
  });

  it('should not add actual year it exists', () => {
    const Locations = [
      { ...LocationMock, year: 2000 },
      { ...LocationMock, year: 2005 },
      { ...LocationMock, year: 2021 },
    ];

    const newLocations = [
      { ...LocationMock, year: 2000 },
      { ...LocationMock, year: 2005 },
      { ...LocationMock, year: getYear(FAKE_TODAY) },
    ];

    expect(addActualYearToLocations(Locations)).toEqual(newLocations);
  });
});

describe('getLastLocation', () => {
  it('should get last location if year doesn\'t exists', () => {
    const year = 1994
    const Locations = [
      { ...LocationMock, year: 1991 },
      { ...LocationMock, year: 1992 },
      { ...LocationMock, year: 1995 },
    ];
    const lastLocation = { ...LocationMock, year: 1992 }
    expect(getLastLocation(year,Locations)).toEqual(lastLocation);
  });
  it('should get last location if year exists', () => {
    const year = 1992
    const Locations = [
      { ...LocationMock, year: 1991 },
      { ...LocationMock, year: 1992 },
      { ...LocationMock, year: 1995 },
    ];
    const lastLocation = { ...LocationMock, year: 1992 }
    expect(getLastLocation(year,Locations)).toEqual(lastLocation);
  });
});

describe('getWeatherImagePath', () => {
  it('should return right weather image', () => {
    expect(getWeatherImagePath(1000,true)).toEqual("clearDay.svg");
    expect(getWeatherImagePath(1003,false)).toEqual("partlyCloudyNight.svg");
  });
});

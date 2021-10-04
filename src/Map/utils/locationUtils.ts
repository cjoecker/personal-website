import { getYear } from 'date-fns';

import { LocationsType } from '../../constants/locations';
import { weatherCodes } from '../../constants/weatherCodes';

interface LocationMarkType {
  value: number;
  label: string;
}

export const THIS_YEAR = getYear(new Date());

export function locationUtils(locations: LocationsType[]): LocationMarkType[] {
  const sortedLocations = sortLocationsByYear(locations);
  const locationsWithActualYear = addActualYearToLocations(sortedLocations);

  const MAX_LOCATION_DIFFERENCE =
    (sortedLocations[sortedLocations.length - 1].year -
      sortedLocations[0].year) *
    0.075;

  let formattedMarks: LocationMarkType[] = [];
  locationsWithActualYear.forEach(location => {
    const marksOfLastYears = formattedMarks.filter(
      mark => mark.value + MAX_LOCATION_DIFFERENCE >= location.year
    );

    if (marksOfLastYears.some(mark => mark.label !== '')) {
      formattedMarks = [
        ...formattedMarks,
        {
          value: location.year,
          label: '',
        },
      ];
    } else {
      formattedMarks = [
        ...formattedMarks,
        {
          value: location.year,
          label: abbreviateYear(location.year),
        },
      ];
    }
  });

  return formattedMarks;
}

export function sortLocationsByYear(
  locations: LocationsType[]
): LocationsType[] {
  return locations.sort((a, b) => a.year - b.year);
}

export function abbreviateYear(year: number) {
  return `'${year.toString().slice(-2)}`;
}

export function addActualYearToLocations(
  sortedLocations: LocationsType[]
): LocationsType[] {
  const lastLocation = sortedLocations[sortedLocations.length - 1];

  if (lastLocation.year < THIS_YEAR) {
    return [...sortedLocations, { ...lastLocation, year: THIS_YEAR }];
  } else {
    return sortedLocations.map((location, index) =>
      index === sortedLocations.length - 1
        ? {
            ...location,
            year: THIS_YEAR,
          }
        : location
    );
  }
}

export function getLastLocation(
  year: number,
  locations: LocationsType[]
): LocationsType {
  const sortedLocations = sortLocationsByYear(locations).reverse();
  return (
    sortedLocations.find(location => location.year <= year) ?? locations[0]
  );
}

export function getWeatherImagePath(
  weatherCode: number | undefined,
  isDay: boolean
): string {
  if (!weatherCode) {
    return `${weatherCodes.get(1000)}Day.svg`;
  }
  const dayOrNight = isDay ? 'Day' : 'Night';
  return `${weatherCodes.get(weatherCode)}${dayOrNight}.svg`;
}

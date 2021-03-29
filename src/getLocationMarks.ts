import { getYear } from 'date-fns';

import { LocationsType } from './locations';

interface LocationMarkType {
  value: number;
  label: string;
}


const THIS_YEAR = getYear(new Date());

export function getLocationMarks(
  locations: LocationsType[]
): LocationMarkType[] {
  const sortedLocations = sortLocationsByYear(locations);
  const locationsWithActualYear = addActualYearToLocations(sortedLocations);

  const MAX_LOCATION_DIFFERENCE = (sortedLocations[sortedLocations.length-1].year - sortedLocations[0].year)/10;

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

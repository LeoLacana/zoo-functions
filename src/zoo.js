/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { species, employees, prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return species.filter((objectSpecies) => ids.some((valueIds) => objectSpecies.id === valueIds));
}

function getAnimalsOlderThan(animal, age) {
  const elementAnimal = data.species.find((elements) => elements.name === animal);
  return elementAnimal.residents.every((elements) => elements.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) { return {}; }
  return employees.find((elements) => elements.firstName === employeeName || elements.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((elementsEmployees) => elementsEmployees.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function countAnimals(specie) {
  if (!specie) {
    const object = {};
    species.forEach((element) => {
      object[element.name] = element.residents.length;
    });
    return object;
  }
  return species.find((element) => element.name === specie).residents.length;
}

function calculateEntry(entrants) {
  if (!entrants || entrants === {}) {
    return 0;
  }
  console.log(Object.keys(entrants));
  return Object.keys(entrants).reduce((sum, current) => sum + (entrants[current] * prices[current]), 0);
}

// As Funções mapGeo e mapGeoNames são para getAnimalMap
const mapGeo = (local) => species.filter((element) => element.location === local).map((objectNames) => objectNames.name);

const mapGeoNames = (sorted, sex) => {
  const arrayAnimalObject = { NE: [], NW: [], SE: [], SW: [] };
  species.forEach((specie) => {
    let names;
    if (sex !== undefined) {
      const sexName = specie.residents.filter((resident) => resident.sex === sex);
      names = sexName.map((resident) => resident.name);
    } else {
      names = specie.residents.map((resident) => resident.name);
    }
    if (sorted === true) {
      names.sort();
    }
    arrayAnimalObject[specie.location].push({ [specie.name]: names });
  });
  return arrayAnimalObject;
};

function getAnimalMap(options) {
  if (options !== undefined && options.includeNames === true) {
    return mapGeoNames(options.sorted, options.sex);
  }
  const object = { NE: mapGeo('NE'), NW: mapGeo('NW'), SE: mapGeo('SE'), SW: mapGeo('SW') };
  return object;
}

// A função dayNameOk é para a getSchedule
const dayNameOk = (dayName) => {
  let objectHours = {};
  if (dayName === 'Monday') {
    objectHours[dayName] = 'CLOSED';
  } else {
    objectHours[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  }
  return objectHours;
};

function getSchedule(dayName) {
  const keys = Object.keys(data.hours);
  let objectHours = {};
  if (!dayName) {
    keys.forEach((value) => {
      if (value === 'Monday') {
        objectHours[value] = 'CLOSED';
      } else {
        objectHours[value] = `Open from ${hours[value].open}am until ${hours[value].close - 12}pm`;
      }
    });
    return objectHours;
  }
  return dayNameOk(dayName);
}

function getOldestFromFirstSpecies(id) {
  const specieEmployeesId = employees.find((employee) => employee.id === id).responsibleFor[0];
  return species.find((specie) => specie.id === specieEmployeesId);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((price) => {
    prices[price] += prices[price] * (percentage / 100);
    prices[price] = Math.round(prices[price] * 100) / 100;
  });
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};

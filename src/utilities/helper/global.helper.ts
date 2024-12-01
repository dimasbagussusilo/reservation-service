import * as moment from 'moment';
import {
  And,
  FindOperator,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { isObject } from 'class-validator';

export const FilterDataExtractor = (queryVal: object) => {
  let finalValue: FindOperator<unknown> | FindOperator<unknown>[];
  const keyLength = Object.keys(queryVal).length;
  if (keyLength > 1) finalValue = [];

  for (const key in queryVal) {
    let value = queryVal[key];
    const rawDatetime = moment(value, 'YYYY-MM-DD HH:mm:ss', true);
    const rawDate = moment(value, 'YYYY-MM-DD', true);
    const rawDatetimeIso = moment(value, moment.ISO_8601, true);
    if (rawDatetime.isValid()) {
      value = rawDatetime.toDate();
    } else if (rawDate.isValid()) {
      if (key == 'gte') {
        value = rawDate.startOf('day').toDate();
      } else if (key == 'lte') {
        value = rawDate.endOf('day').toDate();
      }
    } else if (rawDatetimeIso.isValid()) {
      value = rawDatetimeIso.toDate();
    }

    let tempValue: any;
    if (key === 'like') {
      tempValue = ILike(`%${value}%`);
    } else {
      switch (key) {
        case 'eq':
          tempValue = value;
          break;
        case 'ne':
          tempValue = Not(value);
          break;
        case 'lt':
          tempValue = LessThan(value);
          break;
        case 'lte':
          tempValue = LessThanOrEqual(value);
          break;
        case 'gt':
          tempValue = MoreThan(value);
          break;
        case 'gte':
          tempValue = MoreThanOrEqual(value);
          break;
        case 'in':
          if (!Array.isArray(value)) value = [value];
          tempValue = In(value);
          break;
        case 'nin':
          if (!Array.isArray(value)) value = [value];
          tempValue = Not(In(value));
          break;

        default:
          if (isObject(value)) {
            const tempValue = {};
            for (const tempKey in queryVal) {
              tempValue[tempKey] = FilterDataExtractor(value);
            }
          } else {
            tempValue = queryVal;
          }
          break;
      }
    }
    if (Array.isArray(finalValue)) {
      finalValue.push(tempValue);
    } else {
      finalValue = tempValue;
    }
  }

  if (finalValue && Array.isArray(finalValue)) finalValue = And(...finalValue);
  return finalValue;
};

export const FilterData = (query: any) => {
  const object: Record<string, any> = {};
  for (const queryKey in query) {
    const queryVal = query[queryKey];
    if (typeof queryVal === 'object') {
      object[queryKey] = FilterDataExtractor(queryVal);
    } else {
      object[queryKey] = queryVal;
    }
  }
  return object;
};

export const ExtractSort = (sort: any) => {
  const sortOrder: 'ASC' | 'DESC' = sort.slice(0, 1) == '-' ? 'DESC' : 'ASC';
  const sortField: string = sort.slice(1);
  if (sort.slice(0, 1) != '-' || sort.slice(0, 1) != '+') {
    sortField === sort;
  }
  return {
    sortOrder,
    sortField,
  };
};

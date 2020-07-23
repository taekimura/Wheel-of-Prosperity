import { UPDATE_WHEEL, UPDATE_AVERAGE } from "../constants/action-types";

export function updateWheel(payload) {
  return { type: UPDATE_WHEEL, payload }
};

export function updateAverage(payload) {
  return { type: UPDATE_AVERAGE, payload }
};
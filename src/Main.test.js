import { initializeTimes, updateTimes } from "./Main";

test("initializeTimes returns the correct initial times", () => {
  const expectedTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  expect(initializeTimes()).toEqual(expectedTimes);
});

test("updateTimes returns the same value that is provided in the state", () => {
  const state = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  const action = { type: "UPDATE_TIMES", date: "2026-12-01" };
  expect(updateTimes(state, action)).toEqual(state);
});
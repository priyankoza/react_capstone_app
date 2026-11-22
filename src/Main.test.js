import { initializeTimes, updateTimes } from "./Main";
import { fetchAPI } from "./api";

jest.mock("./api", () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn(),
}));

const mockTimes = ["17:00", "18:30", "20:00"];

beforeEach(() => {
  // Set the return value before every test (CRA resets mocks between tests)
  fetchAPI.mockReturnValue(mockTimes);
});

// Step 1: initializeTimes
test("initializeTimes returns a non-empty array of available booking times", () => {
  const times = initializeTimes();

  expect(Array.isArray(times)).toBe(true);
  expect(times.length).toBeGreaterThan(0);
  expect(times).toEqual(mockTimes);
  expect(fetchAPI).toHaveBeenCalledTimes(1);
  expect(fetchAPI.mock.calls[0][0]).toBeInstanceOf(Date);
});

// Step 2: updateTimes with a pre-selected date in the dispatch data
test("updateTimes returns the available times for the pre-selected date", () => {
  const preSelectedDate = "2026-12-01";
  const action = { type: "UPDATE_TIMES", date: preSelectedDate };

  const result = updateTimes([], action);

  expect(result).toEqual(mockTimes);
  expect(fetchAPI).toHaveBeenCalledWith(new Date(preSelectedDate));
});

test("updateTimes returns the current state for unknown actions", () => {
  const state = ["17:00", "18:00"];
  expect(updateTimes(state, { type: "UNKNOWN" })).toEqual(state);
  expect(fetchAPI).not.toHaveBeenCalled();
});
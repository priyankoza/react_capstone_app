import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";

const availableTimes = ["17:00", "18:00", "19:00"];
const FUTURE_DATE = "2099-12-31";
const PAST_DATE = "2000-01-01";

// Today's date in YYYY-MM-DD (local), matching the component's min date
const getToday = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

// Render the form with fresh mock functions for each test
const renderForm = () => {
  const dispatch = jest.fn();
  const submitForm = jest.fn();
  render(
    <BookingForm
      availableTimes={availableTimes}
      dispatch={dispatch}
      submitForm={submitForm}
    />
  );
  return { dispatch, submitForm };
};

// Fill in every field with valid values
const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText("Choose date"), {
    target: { value: FUTURE_DATE },
  });
  fireEvent.change(screen.getByLabelText("Choose time"), {
    target: { value: "18:00" },
  });
  fireEvent.change(screen.getByLabelText("Number of guests"), {
    target: { value: "4" },
  });
  fireEvent.change(screen.getByLabelText("Occasion"), {
    target: { value: "Birthday" },
  });
};

/* ==========================================================
   Static content
   ========================================================== */

test("Renders the BookingForm date label", () => {
  renderForm();
  expect(screen.getByText("Choose date")).toBeInTheDocument();
});

/* ==========================================================
   Step 1: HTML5 validation attributes
   ========================================================== */

describe("HTML5 validation attributes", () => {
  test("date input is a required date field that cannot be in the past", () => {
    renderForm();
    const dateInput = screen.getByLabelText("Choose date");

    expect(dateInput).toHaveAttribute("type", "date");
    expect(dateInput).toBeRequired();
    expect(dateInput).toHaveAttribute("min", getToday());
  });

  test("time select is required", () => {
    renderForm();
    expect(screen.getByLabelText("Choose time")).toBeRequired();
  });

  test("time select shows an option for every available time", () => {
    renderForm();
    availableTimes.forEach((time) => {
      expect(screen.getByRole("option", { name: time })).toBeInTheDocument();
    });
  });

  test("guests input is a required number between 1 and 10", () => {
    renderForm();
    const guestsInput = screen.getByLabelText("Number of guests");

    expect(guestsInput).toHaveAttribute("type", "number");
    expect(guestsInput).toBeRequired();
    expect(guestsInput).toHaveAttribute("min", "1");
    expect(guestsInput).toHaveAttribute("max", "10");
  });

  test("occasion select is required", () => {
    renderForm();
    expect(screen.getByLabelText("Occasion")).toBeRequired();
  });

  test("submit control is a submit input", () => {
    renderForm();
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});

/* ==========================================================
   Step 2: React validation, valid and invalid states
   ========================================================== */

describe("React form validation", () => {
  // ----- Whole form -----
  test("submit button is disabled when the form is empty (invalid)", () => {
    renderForm();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("submit button is enabled when all fields are valid", () => {
    renderForm();
    fillValidForm();
    expect(screen.getByRole("button")).toBeEnabled();
  });

  test("submitting a valid form calls submitForm with the form data", () => {
    const { submitForm } = renderForm();
    fillValidForm();

    fireEvent.click(screen.getByRole("button"));

    expect(submitForm).toHaveBeenCalledTimes(1);
    expect(submitForm).toHaveBeenCalledWith({
      date: FUTURE_DATE,
      time: "18:00",
      guests: 4,
      occasion: "Birthday",
    });
  });

  test("submitting an invalid form does not call submitForm", () => {
    const { submitForm } = renderForm();
    fireEvent.submit(screen.getByRole("button").closest("form"));
    expect(submitForm).not.toHaveBeenCalled();
  });

  test("error messages are not shown before a field is touched", () => {
    renderForm();
    expect(screen.queryByText("Please choose a date.")).not.toBeInTheDocument();
    expect(screen.queryByText("Please select an occasion.")).not.toBeInTheDocument();
  });

  // ----- Date -----
  test("date: shows an error when left empty after being touched (invalid)", () => {
    renderForm();
    fireEvent.blur(screen.getByLabelText("Choose date"));
    expect(screen.getByText("Please choose a date.")).toBeInTheDocument();
  });

  test("date: shows an error for a past date (invalid)", () => {
    renderForm();
    const dateInput = screen.getByLabelText("Choose date");
    fireEvent.change(dateInput, { target: { value: PAST_DATE } });
    fireEvent.blur(dateInput);

    expect(
      screen.getByText("Please choose today or a future date.")
    ).toBeInTheDocument();
    expect(dateInput).toHaveAttribute("aria-invalid", "true");
  });

  test("date: no error and dispatches UPDATE_TIMES for a future date (valid)", () => {
    const { dispatch } = renderForm();
    const dateInput = screen.getByLabelText("Choose date");
    fireEvent.change(dateInput, { target: { value: FUTURE_DATE } });
    fireEvent.blur(dateInput);

    expect(screen.queryByText("Please choose a date.")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Please choose today or a future date.")
    ).not.toBeInTheDocument();
    expect(dispatch).toHaveBeenCalledWith({
      type: "UPDATE_TIMES",
      date: FUTURE_DATE,
    });
  });

  // ----- Guests -----
  test("guests: shows an error for 0 guests (invalid)", () => {
    renderForm();
    const guestsInput = screen.getByLabelText("Number of guests");
    fireEvent.change(guestsInput, { target: { value: "0" } });
    fireEvent.blur(guestsInput);

    expect(
      screen.getByText("Number of guests must be between 1 and 10.")
    ).toBeInTheDocument();
  });

  test("guests: shows an error for more than 10 guests (invalid)", () => {
    renderForm();
    const guestsInput = screen.getByLabelText("Number of guests");
    fireEvent.change(guestsInput, { target: { value: "11" } });
    fireEvent.blur(guestsInput);

    expect(
      screen.getByText("Number of guests must be between 1 and 10.")
    ).toBeInTheDocument();
  });

  test("guests: no error for a value between 1 and 10 (valid)", () => {
    renderForm();
    const guestsInput = screen.getByLabelText("Number of guests");
    fireEvent.change(guestsInput, { target: { value: "5" } });
    fireEvent.blur(guestsInput);

    expect(
      screen.queryByText("Number of guests must be between 1 and 10.")
    ).not.toBeInTheDocument();
  });

  // ----- Occasion -----
  test("occasion: shows an error when not selected (invalid)", () => {
    renderForm();
    fireEvent.blur(screen.getByLabelText("Occasion"));
    expect(screen.getByText("Please select an occasion.")).toBeInTheDocument();
  });

  test("occasion: no error once an occasion is selected (valid)", () => {
    renderForm();
    const occasionSelect = screen.getByLabelText("Occasion");
    fireEvent.change(occasionSelect, { target: { value: "Anniversary" } });
    fireEvent.blur(occasionSelect);

    expect(
      screen.queryByText("Please select an occasion.")
    ).not.toBeInTheDocument();
  });

  // ----- Time -----
  test("time: shows an error when no times are available (invalid)", () => {
    render(
      <BookingForm availableTimes={[]} dispatch={jest.fn()} submitForm={jest.fn()} />
    );
    fireEvent.blur(screen.getByLabelText("Choose time"));
    expect(
      screen.getByText("Please choose an available time.")
    ).toBeInTheDocument();
  });

  test("time: no error when an available time is selected (valid)", () => {
    renderForm();
    const timeSelect = screen.getByLabelText("Choose time");
    fireEvent.change(timeSelect, { target: { value: "19:00" } });
    fireEvent.blur(timeSelect);

    expect(timeSelect).toHaveValue("19:00");
    expect(
      screen.queryByText("Please choose an available time.")
    ).not.toBeInTheDocument();
  });
});
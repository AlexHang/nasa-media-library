// filepath: e:\Projects\Web\interviews\Codekeeper\solutions\front-end\nasa-media-library\src\components\SearchForm.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import SearchForm from "../SearchForm.jsx";
import {expect, describe, it, jest} from '@jest/globals';

describe("SearchForm", () => {
  const mockParams = {
    q: "",
    year_start: "",
    year_end: "",
  };

  const mockOnParamsChange = jest.fn();
  const mockOnSearch = jest.fn();

  it("renders the SearchForm component", () => {
    render(
      <SearchForm
        params={mockParams}
        onParamsChange={mockOnParamsChange}
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByText("Search NASA Image Collection")).toBeInTheDocument();
    expect(screen.getByLabelText("Search Query*")).toBeInTheDocument();
    expect(screen.getByLabelText("Year Start")).toBeInTheDocument();
    expect(screen.getByLabelText("Year End")).toBeInTheDocument();
    expect(screen.getByTestId("search-btn")).toBeInTheDocument();
  });

  it("validates the form and shows errors", () => {
    render(
      <SearchForm
        params={mockParams}
        onParamsChange={mockOnParamsChange}
        onSearch={mockOnSearch}
      />
    );

    fireEvent.change(screen.getByTestId("search-q-input"), {
      target: { value: "SELECT * FROM users" },
    });
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(screen.getByText("Invalid search query")).toBeInTheDocument();
  });

  it("calls onParamsChange and onSearch when form is valid", () => {
    render(
      <SearchForm
        params={mockParams}
        onParamsChange={mockOnParamsChange}
        onSearch={mockOnSearch}
      />
    );

    fireEvent.change(screen.getByTestId("search-q-input"), {
      target: { value: "Apollo 11" },
    });
    fireEvent.change(screen.getByLabelText("Year Start"), {
      target: { value: "1969" },
    });
    fireEvent.change(screen.getByLabelText("Year End"), {
      target: { value: "1972" },
    });
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(mockOnParamsChange).toHaveBeenCalledWith({
      q: "Apollo 11",
      year_start: "1969",
      year_end: "1972",
    });
    expect(mockOnSearch).toHaveBeenCalled();
  });

  it("shows error when end year is less than start year", () => {
    render(
      <SearchForm
        params={mockParams}
        onParamsChange={mockOnParamsChange}
        onSearch={mockOnSearch}
      />
    );

    fireEvent.change(screen.getByLabelText("Year Start"), {
      target: { value: "2025" },
    });
    fireEvent.change(screen.getByLabelText("Year End"), {
      target: { value: "2020" },
    });
    fireEvent.click(screen.getByTestId("search-btn"));

    expect(screen.getByText("End year must be greater than or equal to start year")).toBeInTheDocument();
  });
});
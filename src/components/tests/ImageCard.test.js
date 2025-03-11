import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";
import ImageCard from "../ImageCard.jsx";
import {expect, describe, it} from '@jest/globals';


describe("ImageCard", () => {
  const props = {
    nasaId: "12345",
    title: "Test Image",
    location: "Test Location",
    photographer: "Test Photographer",
    thumbnail: "https://via.placeholder.com/300x200",
    dateCreated: "2025-03-11",
  };

  it("renders the ImageCard component with all props", () => {
    render(
      <Router>
        <ImageCard {...props} />
      </Router>
    );

    expect(screen.getByTestId("result-image-card")).toBeInTheDocument();
    expect(screen.getByAltText("Test Image")).toBeInTheDocument();
    expect(screen.getByText("Test Image")).toBeInTheDocument();
    expect(screen.getByText("Test Location")).toBeInTheDocument();
    expect(screen.getByText("Test Photographer")).toBeInTheDocument();
    expect(screen.getByText("2025-03-11")).toBeInTheDocument();
  });

  it("renders the ImageCard component without optional props", () => {
    const { location, photographer, ...requiredProps } = props;
    render(
      <Router>
        <ImageCard {...requiredProps} />
      </Router>
    );

    expect(screen.getByTestId("result-image-card")).toBeInTheDocument();
    expect(screen.getByAltText("Test Image")).toBeInTheDocument();
    expect(screen.getByText("Test Image")).toBeInTheDocument();
    expect(screen.queryByText("Test Location")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Photographer")).not.toBeInTheDocument();
    expect(screen.getByText("2025-03-11")).toBeInTheDocument();
  });

  it("renders a placeholder image on error", () => {
    render(
      <Router>
        <ImageCard {...props} />
      </Router>
    );

    const img = screen.getByAltText("Test Image");
    fireEvent.error(img);

    expect(img.src).toBe("https://via.placeholder.com/300x200?text=ERROR");
  });
});
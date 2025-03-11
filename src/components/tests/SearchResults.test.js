import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import SearchResults from "../SearchResults.jsx";
import { expect, describe, it } from '@jest/globals';

const mockResults = [
    {
        data: [
            {
                nasaId: "1",
                title: "Image 1",
                location: "Location 1",
                photographer: "Photographer 1",
                date_created: "2025-03-11",
            },
        ],
        links: [
            {
                href: "https://via.placeholder.com/300x200",
            },
        ],
    },
    {
        data: [
            {
                nasaId: "2",
                title: "Image 2",
                location: "Location 2",
                photographer: "Photographer 2",
                date_created: "2025-03-12",
            },
        ],
        links: [
            {
                href: "https://via.placeholder.com/300x200",
            },
        ],
    },
];

describe("SearchResults", () => {
    it("renders the SearchResults component with results", () => {
        render(<SearchResults results={mockResults} />);

        expect(screen.getByText("Search Results (2)")).toBeInTheDocument();
        expect(screen.getByText("Image 1")).toBeInTheDocument();
        expect(screen.getByText("Image 2")).toBeInTheDocument();
        expect(screen.getByText("Location 1")).toBeInTheDocument();
        expect(screen.getByText("Location 2")).toBeInTheDocument();
        expect(screen.getByText("Photographer 1")).toBeInTheDocument();
        expect(screen.getByText("Photographer 2")).toBeInTheDocument();
        expect(screen.getByText("2025-03-11")).toBeInTheDocument();
        expect(screen.getByText("2025-03-12")).toBeInTheDocument();
    });

    it("renders the SearchResults component with no results", () => {
        render(<SearchResults results={[]} />);

        expect(screen.getByText("Search Results (0)")).toBeInTheDocument();
        expect(screen.queryByText("End of results")).not.toBeInTheDocument();
    });

    it("renders 'End of results' when there are results", () => {
        render(<SearchResults results={mockResults} />);

        expect(screen.getByText("End of results")).toBeInTheDocument();
    });
});
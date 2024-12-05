import GridList from "../Components/GridList";
import { beforeEach, describe, it } from "vitest";
import { expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { IProductDetails } from "../models/IProductDetails";

const testData: IProductDetails[] = [
  {
    id: 1,
    name: "Julgran",
    price: 299,
    description:
      "En stor konstgjord julgran som är perfekt för hemmets alla juldekorationer.",
    stock: 50,
    image: "/images/julgran.webp",
  },
  {
    id: 2,
    name: "Ljusslinga",
    price: 99,
    description: "En vacker ljusslinga som lyser upp vilket rum som helst.",
    stock: 100,
    image: "/images/ljusslinga.webp",
  },
  {
    id: 3,
    name: "Julstjärna",
    price: 149,
    description: "En klassisk julstjärna att hänga i fönstret.",
    stock: 30,
    image: "/images/julstjarna.webp",
  },
  {
    id: 4,
    name: "Adventsljusstake",
    price: 199,
    description: "En traditionell adventsljusstake i modern design.",
    stock: 20,
    image: "/images/adventsljusstake.webp",
  },
];

beforeEach(() => {
  render(
    <BrowserRouter>
      <GridList products={testData} />
    </BrowserRouter>
  );
});

describe("GridList comp", () => {
  it("should contain a section", () => {
    const testIdItem = screen.getByTestId("prod-section");
    expect(testIdItem).toBeInTheDocument();
  });
  it("should have a price for each product", () => {
    const allProducts = screen.getAllByTestId("prod-card");
    allProducts.forEach((item) => {
      const price = within(item).getByText(/SEK/);
      expect(price).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import { Bar } from "../components/Bar";

describe("Bar", () => {
  it("Checar texto da bar em inglês", () => {
    render(<Bar />);
    const teste = screen.getByText("More movies");

    expect(teste).toBeInTheDocument();
  });
});

describe("Bar", () => {
  it("Checar texto da bar em português", () => {
    render(<Bar />);
    const linguagem = screen.getByTitle("en-US");
    const teste = screen.getByText("Mais filmes");

    expect(teste).toBeInTheDocument();
  });
});

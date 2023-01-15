import ArtistDetail from "../components/ArtistDetail/ArtistDetail";
import { MemoryRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import withProvider from "./Provider";

storiesOf("Artist Detail", module)
  .addDecorator(withProvider)
  .addDecorator((story) => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("Normal", () => <ArtistDetail />);

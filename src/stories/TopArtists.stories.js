import TopArtists from "../components/TopArtistsList/TopArtists";
import { MemoryRouter } from "react-router-dom";
import withProvider from "./Provider";
import { storiesOf } from "@storybook/react";

storiesOf("Top Artists", module)
  .addDecorator(withProvider)
  .addDecorator((story) => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("Normal", () => <TopArtists />);

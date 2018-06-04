import React from "react";
import { Scrollable } from "../src/";
import { mount } from "enzyme";

describe("Scrollable", () => {
  it("Should renders without problems", () => {
    const wrapper = mount(
      <Scrollable>
        Кажется, эти придурки вырубились.
      </Scrollable>
    );

    expect(wrapper).toMatchSnapshot();
  });
});

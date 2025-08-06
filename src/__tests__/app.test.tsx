import { describe, it, beforeEach, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "../pages/app";
import userEvent from "@testing-library/user-event";
import type { InitialStateType } from "../store/slices/appSlice";
import type { Reducer, AnyAction } from "redux";

const initialState: InitialStateType = {
  items: [],
  pages: 0,
  currentPage: 1,
  currentArea: null,
  searchText: "",
  bufferText: "",
  stateApp: "vacancies",
  itemsSkils: [],
  status: null,
};

const mockReducer: Reducer<InitialStateType, AnyAction> = (
  state = initialState,
  action
) => {
  if (action.type === "app/switchArea" && action.payload?.area) {
    let currentArea = null;

    switch (action.payload.area) {
      case "Москва":
        currentArea = 1;
        break;
      case "Санкт-Петербург":
        currentArea = 2;
        break;
    }

    return {
      ...state,
      currentArea,
      items: state.items.filter(
        (item) => !currentArea || Number(item.area.id) === currentArea
      ),
    };
  }

  return state;
};

const createMockStore = (initialState: InitialStateType) => {
  return configureStore({
    reducer: {
      app: mockReducer,
    },
    preloadedState: {
      app: initialState,
    },
  });
};

describe("App", () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    const mockStore = createMockStore({
      items: [
        {
          id: "113638933",
          name: "Senior",
          area: { id: "1", name: "Москва", url: "https://hh.ru/area/1" },
          employer: {
            id: "100",
            name: "Ozon",
            url: "https://hh.ru/employer/100",
            alternate_url: "https://ozon.ru",
            logo_urls: {
              "90": "https://example.com/logo90.png",
            },
          },
          experience: { id: "exp1", name: "Более 6 лет" },
          work_format: [{ id: " REMOTE", name: "Удалённо" }],
          salary: {
            from: 4000,
            to: 4700,
            currency: "RUR",
            gross: false,
          },
        },
        {
          id: "493305933",
          name: "Middle",
          area: {
            id: "2",
            name: "Санкт-Петербург",
            url: "https://hh.ru/area/2",
          },
          employer: {
            id: "101", // <-- вот это
            name: "Yandex",
            url: "https://hh.ru/employer/100",
            alternate_url: "https://yandex.ru",
            logo_urls: {
              "90": "https://example.com/logo90.png",
            },
          },
          experience: { id: "exp2", name: "Более 6 лет" },
          work_format: [{ id: " REMOTE", name: "Удалённо" }],
          salary: {
            from: 2000,
            to: 300,
            currency: "RUR",
            gross: false,
          },
        },
      ],
      pages: 1,
      currentPage: 1,
      currentArea: null,
      searchText: "",
      bufferText: "",
      stateApp: "vacancies",
      itemsSkils: ["TypeScript", "React", "Redux"],
      status: null,
    });

    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
  });

  describe("InputArea", () => {
    it("selected Moscow from filters Input", async () => {
      const selectInput = screen.getByTestId("select");

      await userEvent.click(selectInput);
      await userEvent.click(screen.getAllByText("Москва")[1]);

      await waitFor(() => {
        expect(screen.getByText("Senior")).toBeInTheDocument();
        expect(screen.queryByText("Middle")).not.toBeInTheDocument();
      });
    });
  });

  describe("First render", () => {
    it("render items", async () => {
      expect(screen.getByText("Senior")).toBeInTheDocument();
      expect(screen.getByText("Middle")).toBeInTheDocument();
    });

    it("render title", async () => {
      expect(screen.getByText("Список вакансий")).toBeInTheDocument();
      expect(
        screen.getByText("по профессии Frontend-разработчик")
      ).toBeInTheDocument();
    });

    it("render skil set", async () => {
      expect(await screen.findByText("TypeScript")).toBeInTheDocument();
      expect(await screen.findByText("React")).toBeInTheDocument();
      expect(await screen.findByText("Redux")).toBeInTheDocument();
    });

    it("render searchBar input", async () => {
      expect(
        await screen.findByPlaceholderText("Должность или название компании")
      );
    });

    it("render input area", async () => {
      expect(await screen.findByPlaceholderText("Все города"));
    });
  });

  describe("SkilInput", () => {
    it("should add new skill when entering text and pressing Enter", async () => {});
  });
});

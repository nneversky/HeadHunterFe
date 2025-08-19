import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ky from "ky";
import type { CurrencyCode } from "../../service/types";
import { config } from "../../service/config";
import { DictArea } from "../../service/types";

const getStateAppPage = (): string => {
  const pathname = window.location.pathname;
  if (pathname.replace("/", "") === "about") return "about";

  return "vacancies";
};

const getInitialArea = (): number | null => {
  const pathname = window.location.pathname;
  const lastSegment = pathname.split("/").filter(Boolean).pop();
  if (!lastSegment || !(lastSegment in DictArea)) {
    return 1;
  }
  return DictArea[lastSegment];
};

const getInitialSearchText = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("search") || "";
};

const getInitialSkills = () => {
  const params = new URLSearchParams(window.location.search);
  const skills = params.get("skills");
  return skills ? skills.split(" ") : ["TypeScript", "React", "Redux"];
};

type GetItemProps = {
  page: number;
  text: string;
  area: null | number;
};

export interface Salary {
  from: number | null;
  to: number | null;
  currency: CurrencyCode;
  gross: boolean;
}

interface Area {
  id: string;
  name: string;
  url: string;
}

interface Employer {
  id: string;
  name: string;
  url: string;
  alternate_url: string;
  logo_urls?: {
    [key: string]: string | undefined;
  };
}

interface Experience {
  id: string;
  name: string;
}

export interface WorkFormat {
  id: string;
  name: string;
}

export interface VacancyItem {
  id: string;
  name: string;
  area: Area;
  employer: Employer;
  experience: Experience;
  work_format: WorkFormat[];
  salary: Salary | null;
}

interface ApiResponse {
  items: VacancyItem[];
  pages: number;
  page: number;
  per_page: number;
}

export const getItems = createAsyncThunk<ApiResponse, GetItemProps>(
  "app/getItems",
  async ({ page = 0, text = "", area = null }: GetItemProps) => {
    const { industry, professional_role, per_page } = config.defaultParams;
    const data = await ky
      .get(config.baseUrl, {
        searchParams: {
          industry,
          professional_role,
          page,
          per_page,
          text,
          ...(area && { area }),
        },
      })
      .json<ApiResponse>();

    return data;
  }
);

export type InitialStateType = {
  items: VacancyItem[];
  pages: number;
  currentPage: number;
  currentArea: null | number;
  searchText: string;
  bufferText: string;
  stateApp: string;
  itemsSkils: string[];
  status: string | null;
};

const appSlice = createSlice({
  name: "app",
  initialState: {
    status: null,
    items: [],
    pages: 0,
    currentPage: 1,
    currentArea: getInitialArea(),
    searchText: getInitialSearchText(),
    bufferText: getInitialSearchText(),
    stateApp: getStateAppPage(),
    itemsSkils: getInitialSkills(),
  } as InitialStateType,
  reducers: {
    addSkill(state, action) {
      const { skill } = action.payload;
      if (skill.trim().length === 0) return;
      if (!state.itemsSkils.includes(skill)) state.itemsSkils.push(skill);
    },
    changeSkills(state, action) {
      const { skills } = action.payload;
      state.itemsSkils = skills;
    },

    removeSkill(state, action) {
      const { skill } = action.payload;
      const newItemsSkils = state.itemsSkils.filter((item) => {
        if (item !== skill) return item;
      });
      state.itemsSkils = newItemsSkils;
    },
    switchArea(state, action) {
      const { area } = action.payload;
      state.currentArea = DictArea[area];
      state.currentPage = 1;
    },
    switchPage(state, action) {
      const { page } = action.payload;
      state.currentPage = page;
    },
    clickOnLink(state, action) {
      state.stateApp = action.payload;
    },
    inputChange(state, action) {
      const { text } = action.payload;
      state.bufferText = text;
    },
    clickOnSearch(state) {
      state.searchText = state.bufferText;
      state.currentPage = 1;
    },
    cleanUpSearch(state) {
      state.searchText = "";
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.status = "resolved";
      if (action.payload) {
        state.pages = action.payload.pages -= 1;
        state.items = action.payload.items;
      }
    });
    builder.addCase(getItems.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const {
  switchPage,
  inputChange,
  clickOnSearch,
  clickOnLink,
  switchArea,
  addSkill,
  removeSkill,
  cleanUpSearch,
  changeSkills,
} = appSlice.actions;
export default appSlice.reducer;

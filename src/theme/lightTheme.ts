"use client";

import { PaletteOptions, createTheme } from "@mui/material/styles";

// Create a theme instance.
export const palette = {
  primary: {
    //TODO: The color values will be updated by figma design. The current values are only examples.
    main: "#B92786",
    text1: "#000",
    text2: "#797979",
    text3: "#C1C1C1",
    text4: "#B92786",
    success: "#52D285",
    error: "#FF3B30",
    warning: "#FFC107",
    border1: "#CCC",
  },
  secondary: {
    main: "#19857b",
    border1: "#CBCCCD",
    border2: "#E3E5E6",
  },
  background: {
    b1: "#FFF",
    b2: "#FAFAFA",
    b3: "#FBFBFB",
    success: "#15A800",
    error: "#FF3B30",
    warning: "#F2C200",
  },
  mode: "light",
};

(function setPaletteAsCSS(obj: Object, name) {
  if (typeof document !== "undefined") {
    if (typeof obj === "object") {
      Object.entries(obj).forEach(([key, value]) =>
        setPaletteAsCSS(value as Object, name + `-${key}`)
      );
    } else if (typeof obj === "string") {
      document.documentElement.style.setProperty(name, obj);
    } else {
      throw new Error("Unexpected styles type!");
    }
  }
})(palette, "--palette");

export const lightThemeVariables = { palette };

export const lightTheme = createTheme({
  palette: {
    ...lightThemeVariables.palette,
  } as PaletteOptions,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          fontFamily: "poppins",
          fontSize: "24px",
          textTransform: "unset",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          fontFamily: "poppins",
          fontSize: "24px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--palette-primary-main)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--palette-primary-main)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--palette-primary-main)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: "700",
          height: "68px",
          color: "var(--palette-primary-main)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          maxWidth: "400px",
          fontSize: "14px",
          fontWeight: "700",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "var(--palette-primary-main)",
          opacity: "0.4",
          "&.Mui-checked": {
            opacity: "1",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "var(--palette-primary-main)",
        },
      },
    },
  },
});

export default lightTheme;

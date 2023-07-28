const plugin = require("tailwindcss/plugin");

function createShadow(inset, ...px) {
  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,0.2)`, // Umbra
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,0.14)`, // Penumbra
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,0.12)`, // Ambient
  ]
    .map((shadow) => (inset ? "inset " + shadow : shadow))
    .join(",");
}

const scrollBarPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    ".scrollbar-hidden": {
      "scrollbar-width": "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    ".scrollbar-thin": {
      "scrollbar-width": "thin",
    },
  });
});

const flexGapPlugin = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      gap: (value) => ({
        "--gap": value,
      }),
    },
    {
      values: theme("gap"),
    }
  );
  matchUtilities(
    {
      col: (value) => {
        const [span, cols] = value.split(" ");
        return {
          "flex-basis": `calc((100% * ${span} / ${cols}) - (var(--gap) * (1 - ${span} / ${cols})))`,
        };
      },
    },
    {
      values: {
        "1/2": "1 2",
        "1/3": "1 3",
        "2/3": "2 3",
        "1/4": "1 4",
        "2/4": "2 4",
        "3/4": "3 4",
        "3/4": "3 4",
        "1/5": "1 5",
        "2/5": "2 5",
        "3/5": "3 5",
        "4/5": "4 5",
        "1/6": "1 6",
        "2/6": "2 6",
        "3/6": "3 6",
        "4/6": "4 6",
        "5/6": "5 6",
        "1/8": "1 8",
        "2/8": "2 8",
        "3/8": "3 8",
        "4/8": "4 8",
        "5/8": "5 8",
        "6/8": "6 8",
        "7/8": "7 8",
      },
    }
  );
});

module.exports = {
  createShadow,
  scrollBarPlugin,
  flexGapPlugin,
};

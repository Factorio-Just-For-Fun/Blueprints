import { BlueprintBook } from '../objects.mjs';

const blueprintBook = new BlueprintBook({
  blueprint_book: {
    item: "blueprint_book",
    label: "3-8 Rail Network",
    icons: [
      { signal: { type: "virtual", name: "signal-4" }, index: 1 }
    ],
    blueprints: [],
    active_index: 0,
    version: 281479275675648
  }
})
.addObject("./blueprints/rail-grids-3-8/2-3-width-spzi.txt")
.addObject("./blueprints/rail-grids-3-8/4-3-width-spzi.txt")
.addObject("./blueprints/rail-grids-3-8/3-8-stackers-mskitty.txt")
.addObject("./blueprints/rail-grids-3-8/solid-loading-spzi.txt")
.addObject("./blueprints/rail-grids-3-8/liquid-loading-spzi-mskitty.txt")
.addObject("./blueprints/rail-grids-3-8/trains-mskitty.txt")
.addObject("./blueprints/rail-grids-3-8/fuels-spzi.txt")

export default blueprintBook;
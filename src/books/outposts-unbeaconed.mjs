import { BlueprintBook } from '../objects.mjs';
import patching from '../util/patching.mjs';
import strings from '../util/strings.mjs';

import printObject from '../dev-utils/tree-object.mjs';

//
// Start Program
//

const blueprintBook = new BlueprintBook({
  blueprint_book: {
    item: "blueprint_book",
    label: "X on Rails - Unfiltered (No Beacons)",
    icons: [
      { signal: { type: "item", name: "rail" }, index: 1 },
      { signal: { type: "item", name: "rail" }, index: 2 },
      { signal: { type: "virtual", name: "signal-U" }, index: 3 },
      { signal: { type: "virtual", name: "signal-F" }, index: 4 }
    ],
    blueprints: [],
    active_index: 0,
    version: 281479275675648
  }
})
.addObject("./blueprints/rail-designs-3-8/smelting/nobeacon-kerza-start.txt")
.addObject("./blueprints/rail-designs-3-8/smelting/nobeacon-kerza-extension.txt")
.addObject("./blueprints/rail-designs-3-8/smelting/steel-nobeacon-mskitty.txt")
.addObject("./blueprints/rail-designs-3-8/intermediates/green-chips-no-beacon-kerza.txt")

patching.standardizeStationNames(blueprintBook);

if (process.env.CI) { // Add new version tags
  blueprintBook.modifyAllDescriptions(description => `${ description ? description + "\n\n" : "" }${ new Date().toISOString().split("T")[0] } FJFF Blueprints compiled by Ashy314.\nhttps://discord.gg/ehHEDDnPWA`);
}

// Copy to clipboard if called directly
import { fileURLToPath } from "url";
if (process.argv[1] == fileURLToPath(import.meta.url)) {
  const clipboard = (await import("clipboardy")).default;

  clipboard.writeSync(strings.encode(blueprintBook.toObject()));
  await printObject(blueprintBook);
}

export default blueprintBook;

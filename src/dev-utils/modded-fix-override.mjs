import clipboard from 'clipboardy';
import strings from '../util/strings.mjs';
import { parseObject, Blueprint, BlueprintBook } from '../objects.mjs';

// This overwrites all modules, everywhere. This does not (currently) have a list of all assembler recipes
// If something needs fixed with assemblers, let Ashy know, or write something and submit a PR.
const configByType = {
  'beacon': { 'speed-module-3': 2 },
  'lab': { 'productivity-module-3': 2 }
}

const fullProdAssemb = { 'productivity-module-3': 4 }
const fullSpeedAssemb = { 'speed-module-3': 4 }
const fullProdChem = { 'productivity-module-3': 3 }
const configByRecipe = {
  'advanced-oil-processing': fullProdChem,
  'heavy-oil-cracking': fullProdChem,
  'explosives': fullProdChem,
  'solid-fuel-from-light-oil': fullProdAssemb,
  'solid-fuel-from-petroleum-gas': fullProdAssemb,
  'rocket-fuel': fullProdAssemb,
  'rocket': fullSpeedAssemb,
  'explosive-rocket': fullSpeedAssemb,
}


//
// Fix print
//

const unlisted = new Set();

function downgradeModules(object) {
  if (object instanceof BlueprintBook) {
    blueprintBook.blueprints.forEach(downgradeModules);
  } else if (object instanceof Blueprint) {
    object.entities.forEach(it => {
      if (it.name && configByType[it.name]) it.items = configByType[it.name];
      else if (it.recipe) {
        if (configByRecipe[it.recipe]) it.items = configByRecipe[it.recipe];
        else {
          if (it.recipe in unlisted) return;
          unlisted.add(it.recipe);
          console.log(`Recipe not found: ${ it.recipe }`);
        }
      }
    });
  }

  return object;
}

//
// Run Program
//

const blueprint = parseObject(strings.decode(clipboard.readSync()));

clipboard.writeSync(strings.encode(downgradeModules(blueprint).toObject()));

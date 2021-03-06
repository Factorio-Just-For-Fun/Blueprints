function standardizeStationNames(book) {
  return book
    .modifyAllStationNames(name => name.replace(/\[\/?color(\=((\d{1,3},\d{1,3},\d{1,3})|(\w+)))?\]/g, "")) // Remove colors
    .modifyAllStationNames(name => name.replace(/(\s\*)+$/g, "")) // Remove stars
    .modifyAllStationNames(name => name.replace(/3\-8/g, "")) // Remove 3-8 indicators
    .modifyAllStationNames(name => name.replace(/\[img=(item|fluid).([\w\-]+)\]/g, "[$1=$2]")) // Fix [img=item/fluid.name] with [item/fluid=name]
    .modifyAllStationNames(name => (name == "" || name == "[U]") ? "☭ Communism" : name) // Replace unnamed stations with Communism
    .modifyAllStationNames(name => name.trim()); // Trim all station names
}

export default {
  standardizeStationNames
}

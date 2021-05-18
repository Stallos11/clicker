export default {
  name: "nFormatter",
  format: function(num: number, digits: number) {
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "B" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "aa" },
      { value: 1E18, symbol: "bb" },
      { value: 1E21, symbol: "cc" },
      { value: 1E24, symbol: "dd" },
      { value: 1E27, symbol: "ee" },
      { value: 1E30, symbol: "ff" },
    ];
    let i: number;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }
}
export const addSIPrefix = (e) => {
  const units = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];
  let o = parseFloat(e, 10);
  let n = 0
  for (; o >= 1e3;) {
    o /= 1000;
    n++;
  }
  return o.toFixed(2) + " " + units[n]
}

export const timeSince = (e) => {
  let t = Math.floor(e / 31536e3);
  return t > 1 ? t + " y" : (t = Math.floor(e / 2592e3)) > 1 ? t + " months" : (t = Math.floor(e / 86400)) > 1 ? t + " days" : (t = Math.floor(e / 3600)) > 1 ? t + " hours" : (t = Math.floor(e / 60)) > 1 ? t + " min" : "NOW"
}

const toTime = (data) => {
  const parsed = data.replace(/'/g, "").split(/(\d+)/).filter(Boolean);
  return parsed.reduce((acc, item, index) => {
    if (index % 1 === 0) {
      switch (item) {
        case "s":
          acc += parseInt(parsed[index - 1], 10) * 1000;
          break;
        case "m":
          acc += parseInt(parsed[index - 1], 10) * 1000 * 60;
          break;
        case "h":
          acc += parseInt(parsed[index - 1], 10) * 1000 * 60 * 60;
          break;
        case "d":
          acc += parseInt(parsed[index - 1], 10) * 1000 * 60 * 60 * 24;
          break;
      }
    }
    return acc;
  }, 0);
};

const minifyWorker = (css) => css.replace(/\n/g, "").replace(/\s\s+/g, " ");

const generate = () => {
  return [
    ...preCache(),
  ];
};

const preCache = () => {
  const cachePages = [];
  const precacheData = [
    {
      url: "ka/",
    },
  ];
  precacheData.forEach((item) => {
    const { url, query } = item;
    const prefix = "/";
    cachePages.push(`${prefix}${url}`);
    if (query) {
      cachePages.push(`${prefix}${url}?${query}`);
    }
  });
  return [
    {
      name: "cache-pages",
      data: cachePages,
    },
  ];
};

module.exports = {
  generate,
  minifyWorker,
  toTime,
  preCache,
};

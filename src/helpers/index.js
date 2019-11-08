export const debounce = (f, ms) => {
  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => {
      isCooldown = false;
    }, ms);
  };
};

export const loadData = async url => {
  const data = await fetch(url);
  const jsonData = await data.json();
  return jsonData;
};

export const getFormattedDate = (date, currentLang = 'en') => {
  const _date = new Date(date);
  return _date.toLocaleDateString(currentLang, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

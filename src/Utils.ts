export const Query = {
  parse(query?: string) {
    return (query || window.location.search.substr(1))
      .split("&")
      .map(it => it.split("="))
      .reduce<{ [key: string]: string }>(
        (prev, current) => ({ ...prev, [current[0]]: current[1] }),
        {}
      );
  },

  stringify(object: any) {
    return Object.keys(object)
      .map(it => [it, object[it]].join("="))
      .join("&");
  }
};

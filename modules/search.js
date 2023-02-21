export class Search {
  constructor(view) {
    this.view = view;

    this.view.searchInput.addEventListener(
      "keyup",
      this.debounce(this.searchRepositories.bind(this))
    );
  }

  async searchRepositories() {
    if (this.view.searchInput.value) {
      this.clearRepositories();
      return await fetch(
        `https://api.github.com/search/repositories?q=${this.view.searchInput.value}&per_page=5`
      ).then((response) => {
        response.json().then((response) => {
          response.items.forEach((repository) => {
            this.view.createResultList(repository);
          });
        });
      });
    } else {
      this.clearRepositories();
    }
  }

  clearRepositories() {
    this.view.searchList.textContent = "";
  }

  debounce(func) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this.arguments), 500);
    };
  }
}

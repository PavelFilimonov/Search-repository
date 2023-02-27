export class Search {
  constructor(view) {
    this.view = view;

    // Заменил type с "click" на "input"
    this.view.searchInput.addEventListener(
      "input",
      this.debounce(this.searchRepositories.bind(this))
    );
  }

  async searchRepositories() {
    const searchValue = this.view.searchInput.value;
    if (searchValue) {
      this.clearRepositories();
      // Использовал блоки try, catch. Перестал использовать async/await с .then
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${searchValue}&per_page=5`
        );
        const data = await response.json();
        if (data.items.length) {
          await data.items.forEach((repository) => {
            this.view.createResultList(repository);
          });
        } else {
          // Добавляется нода, если результат поиска пустой
          this.view.createEmptySearchMessage();
        }
      } catch (err) {
        console.error(err);
      }
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

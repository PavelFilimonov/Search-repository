export class View {
  constructor() {
    this.app = document.getElementById("app");
    this.search = this.createNode("section", "search");
    this.searchInput = this.createNode("input", "input", "search__input");
    this.searchList = this.createNode(
      "ul",
      "search-list",
      "search__search-list"
    );

    this.result = this.createNode("section", "result");
    this.resultList = this.createNode(
      "ul",
      "result-list",
      "result__result-list"
    );

    this.search.append(this.searchInput);
    this.search.append(this.searchList);

    this.result.append(this.resultList);

    this.app.append(this.search);
    this.app.append(this.result);
  }

  createNode(blockTag, blockClass, elementClass) {
    const block = document.createElement(blockTag);
    if (blockClass) {
      block.classList.add(blockClass);
      if (elementClass) {
        block.classList.add(elementClass);
      }
    }
    return block;
  }

  createResultList(repositoryData) {
    const searchListItem = this.createNode("li", "item", "search-list__item");
    searchListItem.textContent = repositoryData.name;
    this.searchList.append(searchListItem);
    searchListItem.addEventListener("click", () =>
      this.createSelectedRepository(repositoryData)
    );
  }

  createSelectedRepository(repositoryData) {
    let { name, owner, stargazers_count } = repositoryData;
    const repoData = this.createNode("ul", "repo");
    const repoName = this.createNode("li", "name", "repo__name");
    const repoOwner = this.createNode("li", "owner", "repo__owner");
    const repoStars = this.createNode("li", "sats", "repo__stars");
    const repoBtn = this.createNode("li", "btn", "repo__btn");
    const btnClose = this.createNode("button", "btn-close");

    repoName.textContent = `Name: ${name}`;
    repoOwner.textContent = `Owner: ${owner.login}`;
    repoStars.textContent = `Stars: ${stargazers_count}`;
    repoBtn.append(btnClose);
    repoData.append(repoName, repoOwner, repoStars, repoBtn);

    let resultListItem = this.createNode("li", "item", "result-list__item");
    resultListItem.addEventListener("click", () => resultListItem.remove());
    resultListItem.append(repoData);
    this.resultList.append(resultListItem);
  }
}

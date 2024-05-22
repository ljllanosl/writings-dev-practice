// Elementos del DOM
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("wrapper");
const listItems = paginatedList?.querySelectorAll(".card");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
// Variables globales
const paginationLimit = 9;
const pageCount = Math.ceil((listItems?.length || 9) / paginationLimit);
let currentPage: number;
// Añadir numeros de pagina
const appendPageNumber = (index: number) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index.toString();
  pageNumber.setAttribute("page-index", index.toString());
  pageNumber.setAttribute("aria-label", "Page " + index);
  paginationNumbers?.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};
// Cargar funcion
window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);
  // Asignar paginas a botones
  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
// Mostrar pagina activa
const setCurrentPage = (pageNum: number) => {
  currentPage = pageNum;

  handleActivePageNumber();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems?.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};
// Asignar pagina activa
const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");

    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  })
}
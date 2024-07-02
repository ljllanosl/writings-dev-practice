// Elementos del DOM
const nextButton = document.getElementById("next-button")!
const prevButton = document.getElementById("prev-button")!
const paginationNumbers = document.getElementById("pagination-numbers")
let listItems = document.querySelectorAll(".card")

// Variables
const paginationLimit = 9;
let currentPage: number;
let pageCount = Math.ceil((listItems?.length || 9) / paginationLimit);

// Crear botones con numeros
const appendPageNumber = (index: number) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index.toString();
  pageNumber.setAttribute("page-index", index.toString());
  pageNumber.setAttribute("aria-label", "Page " + index);
  paginationNumbers?.appendChild(pageNumber);
};

// Obtener paginas y asignar a botones
export function getPaginationNumbers() {
  pageCount = Math.ceil((document.querySelectorAll(".card")?.length || 9) / paginationLimit);
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
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
// Deshabilitar botones
const disableButton = (button: HTMLElement) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", "true");
}

const enableButton = (button: HTMLElement) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
}

// Habilita/Dehabilita botones Prev Next
const handlePageButtonStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
}

// Mostrar pagina activa
const setCurrentPage = (pageNum: number) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems = document.querySelectorAll(".card")

  listItems?.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

const setCurrentPageAndScroll = (page: number) => {
  setCurrentPage(page)
  document.getElementById("articles")?.scrollIntoView();
}

// Paginado  
export function paginationStart() {
  getPaginationNumbers();
  setCurrentPage(1);

  // Asignar paginas a botones
  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = parseInt(button.getAttribute("page-index")!)

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPageAndScroll(pageIndex)
      });
    }
  });
}

export function paginationRemove() {
  prevButton.removeEventListener("click", () => {
    setCurrentPageAndScroll(currentPage - 1)
  })
  nextButton.removeEventListener("click", () => {
    setCurrentPageAndScroll(currentPage + 1)
  })
}

const orderCardsByDate = () => {
  const dataList = document.getElementById('dataList') as HTMLElement
  const originalData = Array.from(listItems)
  const sortedData = originalData.sort((a,b) => {
    const dateA = new Date(a.querySelector(".date")?.textContent!)
    const dateB = new Date(b.querySelector(".date")?.textContent!)
    return dateB.getTime() - dateA.getTime()
  })
  dataList.innerHTML = ''
  sortedData.forEach(item => dataList.appendChild(item))
}


// Cargar funcion al inicio
window.addEventListener("DOMContentLoaded", () => {
  orderCardsByDate()
  paginationStart()
  // Botones Previous y Next
  prevButton.addEventListener("click", () => {
    setCurrentPageAndScroll(currentPage - 1)
  })
  nextButton.addEventListener("click", () => {
    setCurrentPageAndScroll(currentPage + 1)
  })
});
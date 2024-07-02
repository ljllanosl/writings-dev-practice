import { paginationStart } from "./pagination"

const filterButtons = document.querySelectorAll('.category-button')
const dataList = document.getElementById('dataList') as HTMLElement

const originalData = Array.from(dataList?.querySelectorAll('.card'))

// Funcion para filtrar datos por categoria
function filterData(category: string | null) {
  const filteredData = originalData.filter(item => {
    const categoryItem = item.querySelector('.category-title')
    return (
      category === 'All' ||
      (categoryItem as HTMLParagraphElement).innerText === category
    )
  })
  dataList.innerHTML = ''
  filteredData.forEach(item => dataList.appendChild(item))
}

document.addEventListener('DOMContentLoaded', () => {
  
  // Asignar eventos a cada boton de categoria
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category')
      filterData(category)
      const paginationNumbers = document.getElementById("pagination-numbers")
      paginationNumbers!.innerHTML = ''
      paginationStart()
    })
  })
})
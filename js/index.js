import productsList from "./addDragDropToList.js";
import productsAPI from "./api.js";
import createProductBlock from "./createProductBlock.js";
import { createStore } from "./store/createStore.js";

const countInput = document.querySelector('.enter-count__input')
const warningForInput = document.querySelector('.input-block__warning')
const countBtn = document.querySelector('.enter-count__button')

countBtn.addEventListener('click', () => {
  warningForInput.style.opacity = '0'

  if (countInput.value && +countInput.value >= 1 && +countInput.value <= 100) { // проверка на правильность введенных данных
    store.dispatch({ type: 'SET-QUANTITY', data: countInput.value }) // изменение свойста quantity у состояния 

  }
  else {
    warningForInput.style.opacity = '1' //показывает предупреждение о неправильно введенных данных
  }
  countInput.value = ''
})


const select = document.querySelector('.sort__select')

select.addEventListener('change', (e) => {
  store.dispatch({ type: e.target.value }) // на каждом изменении элемента select происходит изменение свойства sortFunc у состояния 

})

let store = createStore( //создание store с указанием начального значения у state
  {
    sortFunc: (item1, item2) => item1.title.toLowerCase() > item2.title.toLowerCase() ? 1 : -1,
    quantity: 10
  }) 

const fillList = async function () {
  productsList.innerHTML = '';
  const state = store.getState()

  let startingProductsData = await productsAPI.getStartingProductsData(state.quantity); //  state.quantity регулирует количество элементов, которое должно быть выведено
  if (startingProductsData) {
    startingProductsData.sort(state.sortFunc)                                  // state.sortFunc - функция сортировки продуктов
      .forEach((product) => productsList.append(createProductBlock(product))); // создание блоков продуктов и добавление  их по очереди в конец списка
  }

}

window.onload = function () {
  store.subscribe(fillList) // подписка функции fillList на каждое изменение state
  fillList(); // первичная отрисовка продуктов
}





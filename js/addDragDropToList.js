const productsList = document.querySelector('.products__list');

productsList.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`product_selected`);             //добавляем перемещающемуся элементу класс selected
  })
  productsList.addEventListener(`dragend`, (evt) => { 
    evt.target.classList.remove(`product_selected`); //при окончании перемещения убираем класс selected
  });

  productsList.addEventListener(`dragover`, (evt) => {
    evt.preventDefault(); // Разрешаем сбрасывать элементы в эту область

    const activeElement = productsList.querySelector(`.product_selected`);   // Находим перемещаемый элемент

    const currentElement = evt.target;  // Находим элемент, над которым в данный момент находится курсор

    const isMoveable = activeElement !== currentElement && //проверка на чем сработало событие(не на том элементе, который мы перемещаем и не на элементе списка)
      currentElement.classList.contains(`product`);

    if (!isMoveable) {   // Если событие сработало на том элементе, который мы перемещаем или не на элементе списка, то прерываем выполнение функции
      return;
    }

    const nextElement = (currentElement === activeElement.nextElementSibling) ?   // Находим элемент, перед которым будем вставлять
      currentElement.nextElementSibling :
      currentElement;

    productsList.insertBefore(activeElement, nextElement);   // Вставляем activeElement перед nextElement
  });

  export default productsList;
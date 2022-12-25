import productsAPI from "./api.js"

async function showDescription(event) {

  const descriptionBlock = event.target.querySelector('.product__description')
  descriptionBlock.style.display = 'block'

  if (!descriptionBlock.hasChildNodes()) { // если блок описания уже имеет дочерние узлы, значит он уже был заполнен и нет необходимости заполнять его повторно
    let item = await productsAPI.getProductForId(+event.target.getAttribute('data-nm-id')) // получаем продукт по id
    fillDescriptionBlock(descriptionBlock, item)
  }

}

function hideDescriptionBlock(event) {

  event.target.querySelector('.product__description').style.display = 'none'

}

function fillDescriptionBlock(descriptionBlock, { brand, category, price, discountPercentage, description }) {
  descriptionBlock.innerHTML = `
                            <div class='description__parameter'> <div class='parameter__name'>Brand:</div> <div class='parameter__value'>${brand}</div> </div>
                            <div class='description__parameter'> <div class='parameter__name'>Category:</div> <div class='parameter__value'>${category}</div> </div>
                            <div class='description__parameter'> <div class='parameter__name'>Price:</div> <div class='parameter__value'>${price} $</div> </div>
                            <div class='description__parameter'> <div class='parameter__name'>Discount:</div> <div class='parameter__value'>${discountPercentage} %</div> </div>
                            <div class='description__parameter'> <div class='parameter__name'>Description</div> <div class='parameter__value'>${description}</div> </div>
                            `
  return descriptionBlock
}
 
function createDescriptionBlock() { //изначально блок создается пустым, но при наведении на него заполняется данными
  const descriptionBlock = document.createElement('div') 
  descriptionBlock.className = 'product__description'
  return descriptionBlock
}

function createTitleBlock(text) {
  const titleBlock = document.createElement('div')
  titleBlock.className = 'product__title'
  titleBlock.innerText = text
  return titleBlock
}

const createProductBlock = ({ title, id }) => { 
  const productBlock = document.createElement('li')
  productBlock.className = 'product'
  productBlock.setAttribute('data-nm-id', id)
  productBlock.draggable = true //для возможности перетаскивания элементов в списке
  productBlock.append(createTitleBlock(title)) // блок, который показывается изначально
  productBlock.append(createDescriptionBlock()) // блок показывается при наведении мыши
  productBlock.addEventListener('mouseenter', showDescription) // при наведении на продукт будет показываться доп. информация(описани)
  productBlock.addEventListener('mouseleave', hideDescriptionBlock) // при убирании мыши с блока доп. информация будет скрываться
  return productBlock
}

export default createProductBlock;
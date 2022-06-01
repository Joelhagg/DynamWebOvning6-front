let rawcatogriyList = [];
let uniqueCategory = [];
let categoryMenu = document.getElementById("categoryMenu");

const getCategories = async () => {
  try {
    await fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((result) => (rawcatogriyList = result));
  } catch (error) {}

  rawcatogriyList.filter((catergory) => {
    const isDuplicate = uniqueCategory.includes(catergory.productLine);

    if (!isDuplicate) {
      uniqueCategory.push(catergory.productLine);
      return uniqueCategory;
    }
    return false;
  });

  for (let i = 0; i < uniqueCategory.length; i++) {
    let button = document.createElement("button");
    button.textContent = uniqueCategory[i];
    button.id = uniqueCategory[i];
    button.addEventListener("click", () => {
      clicked(uniqueCategory[i]);
    });
    categoryMenu.append(button);
  }
};

const clicked = async (category) => {
  console.log(category);

  try {
    await fetch(`http://localhost:3000/products/${category}`)
      .then((response) => response.json())
      .then((result) => console.log(result));
  } catch (error) {
    console.log("error", error);
  }
};

getCategories();

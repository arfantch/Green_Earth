

const categoriesContainer = document.getElementById('categoriesContainer')
const treeCardContainer = document.getElementById('treeCardContainer')
const modalContainer = document.getElementById('my_modal_5')

// left side category functions
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => {
            const categories = data.categories
            showCategory(categories)
        })
        .catch(err => {
            console.log(err)
        })
}

const showCategory = (categories) => {
    categoriesContainer.innerHTML = `<li id="allTrees" class="hover:bg-[#15803D] mt-2 p-1 hover:text-white text-lg rounded-lg">All Trees</li>`

    categories.forEach(category => {
        categoriesContainer.innerHTML += `<li id="${category.id}" class=" hover:bg-[#15803D] mt-2 p-1 hover:text-white text-lg rounded-lg">${category.category_name}</li>`
    })

    categoriesContainer.addEventListener('click', (e) => {

        if (e.target.localName === 'li') {
            const allLi = categoriesContainer.querySelectorAll('li');
            allLi.forEach(li => li.style.cursor = 'pointer')
            allLi.forEach(li => {
                li.classList.remove('bg-[#15803D]', 'text-white')
            })
            e.target.classList.add('bg-[#15803D]', 'text-white');

            if (e.target.id === 'allTrees') {
                loadAllTree();

            } else {
                loadTreesByCategory(e.target.id)
            }
        }
    })

    const allTreesBtn = document.getElementById('allTrees');
    if (allTreesBtn) {
        allTreesBtn.classList.add('bg-[#15803D]', 'text-white');
        loadAllTree()

    }
}


//load all tress


const loadAllTree = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => {
            showTreeByCategory(data.plants)
        })
        .catch(err => {
            console.log(err)
        })
}



const loadTreesByCategory = (categoryTreeId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryTreeId}`)
        .then(res => res.json())
        .then(data => {
            showTreeByCategory(data.plants)
        })

        .catch(err => {
            console.log(err)
        })
}


const showTreeByCategory = (trees) => {
    treeCardContainer.innerHTML = "";
    trees.forEach(tree => {
        treeCardContainer.innerHTML += `<div class=" bg-white w-72 shadow-lg rounded-xl">
                                <div class="p-5">
                                    <div class="rounded-2xl overflow-hidden mb-3"><img  src="${tree.image}" alt="" class="w-full h-40 object-cover">
                                    </div>
                                    <div>
                                        <h2 class="modal-btn font-semibold mb-1" data-id=${tree.id} >${tree.name}</h2>
                                        <p class="text-sm line-clamp-3 mb-3">${tree.description}</p>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <h3 id="" class=" rounded-3xl text-lg px-3 py-1 text-green-900 bg-green-100" >${tree.category}
                                        </h3>
                                        <p class="text-lg font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign text-sm mr-1"></i>${tree.price}</p>
                                    </div>
                                    <div class="btn w-full bg-[#15803D] rounded-3xl mt-3 text-white"><button
                                            class="text-lg">Add to Cart</button></div>
                                </div>
                            </div>`
    })
    console.log(trees)

}


const loadModal = (PlantId) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${PlantId}`)
        .then(res => res.json())
        .then(data => {
            showModal(data.plants)
        })

        .catch(err => {
            console.log(err);
        })
}

const showModal = (detail) => {
 
    modalContainer.innerHTML = ` <div class="modal-box">
                <div class="flex flex-col bg-white w-100 rounded-xl ">
            <h2 class="font-bold text-3xl  ">${detail.name}</h2>
        <div class="space-y-3">
            <div class="shadow-lg    rounded-2xl overflow-hidden  my-5"><img class="w-full h-60 object-cover" src="${detail.image}" alt=""></div>
            <h3 class="font-bold text-xl">Category: <span class="font-normal">${detail.category}</span></h3>
            <p class="font-bold text-xl">price: <span class="font-normal text-lg"><i class="fa-solid fa-bangladeshi-taka-sign text-sm"></i>${detail.price}</span></p>
            <p class="font-bold text-xl">Description: <span class="font-normal text-lg">${detail.description}</span></p>

        
            </div>
                     <div class="modal-action mt-5 ">
                          <form method="dialog" class="">
                            <div class="flex justify-end"><button class="btn text-xl">Close</button></div>
                        </form>
                      </div>
    
                 </div>
            </div>`

    modalContainer.showModal()

}

treeCardContainer.addEventListener('click', (t) => {
    const target = t.target.closest('.modal-btn');
    target.style.cursor = 'pointer'

    const plantId = target.dataset.id;
    loadModal(plantId)


})


loadCategory()

document.addEventListener("DOMContentLoaded", () => {
    const shoeGrid = document.getElementById('shoeGrid');
    const searchBar = document.getElementById('search-bar');
    let shoeData = [];

    function fillGrid(shoes) {
        shoeGrid.innerHTML = '';
        shoes.forEach(shoe => {
            const shoeItem = document.createElement('div');
            shoeItem.classList.add('shoe');
            shoeItem.innerHTML = `
            <img src="${shoe.img}"  alt="${shoe.name}" onerror="this.onerror=null;this.src='images/default.jpg';">
            <h3>${shoe.name}</h3>
            <p>Price: ${shoe.price}</p>
            <p>Stock: <span id="stock-${shoe.id}">${shoe.stock}</span></p>
            <button class="order-button" data-id="${shoe.id}">order</button>
            `;
            shoeGrid.appendChild(shoeItem);
        });
       
        const buttons = document.querySelectorAll('.order-button');
        buttons.forEach(button =>{
            button.addEventListener('click', (event) => {
                const shoeId = event.target.getAttribute('data-id');

                const foundShoe = shoeData.find(shoe => shoe.id == shoeId);

                if (foundShoe && foundShoe.stock > 0) {
                    foundShoe.stock--;

                    document.getElementById(`stock-${foundShoe.id}`).textContent = foundShoe.stock;

                    if (foundShoe.stock === 0) {
                        event.target.disabled = true;
                        event.target.textContent = 'Out of stock';
                    }

                }
                else {
                    alert('Shoe is out of stock!');
                }
            });
        });
    }
        fetch('del.json')
        .then(response => response.json())
        .then(data => {
            shoeData = data.shoes.map(shoe => ({
                ...shoe,
                stock: Number(shoe.stock)
            }));
            fillGrid(shoeData);
        })
        .catch(error => console.error('Error loading JSON:', error));
    
        searchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredShoe = shoeData.filter(shoe => shoe.name.toLowerCase().includes(searchTerm));
        fillGrid(filteredShoe);
        });
});
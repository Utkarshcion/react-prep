export const syncMenuItems = async () => {
    console.log('Calling ServeR !!');
    const result = await fetch('https://react-food-36b00-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');

    const menuObject = await result.json();
    const menuItems = [];

    for (let key in menuObject) {
        let menuItem = {
            id: key,
            name: menuObject[key].name,
            description: menuObject[key].description,
            price: menuObject[key].price
        };
        menuItems.push(menuItem);
    }

    return menuItems;
};

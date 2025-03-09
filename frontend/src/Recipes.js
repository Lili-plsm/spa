import React, { useEffect, useState } from 'react';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [newRecipe, setNewRecipe] = useState({ name: '' });
    const [loading, setLoading] = useState(true);

    // Функция для получения рецептов (GET-запрос)
    const fetchRecipes = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/recipes/');
            const data = await response.json();
            setRecipes(data);
            setLoading(false);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            setLoading(false);
        }
    };

    // Функция для добавления нового рецепта (POST-запрос)
    const createRecipe = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/recipes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecipe),
            });

            if (response.ok) {
                // Если добавление прошло успешно, загружаем новые данные
                fetchRecipes();
                setNewRecipe({ name: '' }); // Сбрасываем форму
            } else {
                console.error('Ошибка при добавлении рецепта');
            }
        } catch (error) {
            console.error('Ошибка при добавлении рецепта:', error);
        }
    };

    // Загружаем рецепты при монтировании компонента
    useEffect(() => {
        fetchRecipes();
    }, []);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    return (
        <div>
            <h1>Список рецептов</h1>
            {recipes.map(recipe => (
                <div key={recipe.id}>
                    <h2>{recipe.name}</h2>
                    <p>ID: {recipe.id}</p>
                </div>
            ))}

            <h2>Добавить новый рецепт</h2>
            <input
                type="text"
                value={newRecipe.name}
                onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                placeholder="Название рецепта"
            />
            <button onClick={createRecipe}>Добавить</button>
        </div>
    );
};

export default Recipes;

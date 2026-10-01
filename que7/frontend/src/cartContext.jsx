import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {

        const existingProduct = cart.find(
            item => item._id === product._id
        );

        if (existingProduct) {

            setCart(
                cart.map(item =>
                    item._id === product._id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                )
            );

        } else {

            setCart([
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ]);

        }
    };

    const increaseQuantity = (id) => {

        setCart(
            cart.map(item =>
                item._id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {

        setCart(
            cart
                .map(item =>
                    item._id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const removeFromCart = (id) => {

        setCart(
            cart.filter(item => item._id !== id)
        );

    };

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
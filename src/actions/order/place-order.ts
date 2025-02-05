'use server';

import { auth } from "@/auth.config";
import type { Address, ValidSizes } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductOrder {
    productId: string;
    quantity: number;
    size: ValidSizes;
}

export const placeOrder = async (productIds: ProductOrder[], address: Address) => {
 
    const session = await auth();
    const userId = session?.user.id;

    //console.log({products:productIds, address: address});

    if (!userId) {
        return {
            ok: false,
            message: 'No session user active'
        }
    }

    // get products info
    const products = await prisma.game.findMany({
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    })
    // console.log({cart: products})

    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
    // console.log({ totalQuantity: itemsInOrder });

    const { subTotal, tax, total } = productIds.reduce((totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(product => product.id === item.productId);

        if (!product) throw new Error(`${item.productId} no exited - 500`);

        const subTotal = product.price * productQuantity;
        
        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
    }, { subTotal: 0, tax: 0, total: 0 });

    // transition products
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
        
            // 1
            const updateProductsPromises = products.map((product) => {
                const productQuantity = productIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => item.quantity + acc, 0);
    
                if (productQuantity === 0) {
                    throw new Error(`${product.id} - no quantity`);
                };
    
                return tx.game.update({
                    where: { id: product.id },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            });
    
            const updateProducts = await Promise.all( updateProductsPromises )
            updateProducts.forEach(product => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} any product in stock`);
                }
            })
             
    
    
            // 2
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
    
                    OrderItem: {
                        createMany: {
                            data: productIds.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id === p.productId)?.price ?? 0,
                            }))
                        }
                    }
                }
            })
    
            // 3
            const orderAddress = await tx.orderAddress.create({
                data: {
                    firstName: address.firstName,
                    lastName: address.lastName,
                    address: address.address,
                    address2: address.address2,
                    city: address.city,
                    postalCode : address.postalCode,
                    phone: address.phone,
                    countryId: address.country,
                    orderId: order.id
                }
            })
    
            return {
                order: order,
                updateProducts: updateProducts,
                orderAddress: orderAddress
            }
        })

        return {
            ok: true,
            order: prismaTx.order
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message
        }
    }
}
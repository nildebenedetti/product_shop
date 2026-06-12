function normalizeProduct(product) {
    if (!product) return null;
    
    const relativePath = product.image_url?.replace('http://localhost:3000', '') || product.imageUrl?.replace('http://localhost:3000', '') || '';
    
    return {
        ...product,
        price: parseFloat(product.price),
        image_url: process.env.APP_URL ? `${process.env.APP_URL}${relativePath}` : relativePath
    };
}

const generateCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
}

export { 
    normalizeProduct,
    generateCurrentDate 
};
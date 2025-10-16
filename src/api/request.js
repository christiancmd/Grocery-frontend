import axios from "axios";

const requestProductApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/grocery/api/groceries'
})

const requestCategoryApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/grocery/api/categories/'
})

const requestPdf = axios.create({
    baseURL: 'http://127.0.0.1:8000/grocery/generate-pdf'
})

const requestExcel = axios.create({
    baseURL: 'http://127.0.0.1:8000/grocery/generate-excel'
})

export const getAllProducts = async () => {
    try {
        const res = await requestProductApi.get('/');
        return res.data;
    } catch (error) {
        console.error('Error al cargar los producto:', error);
        throw error
    }
}
export const getProduct = async (id) => {

    if (!id) {
        const error = new Error('ID de producto no definido');
        console.error(error.message);
        throw error;
    }

    try {
        const res = await requestProductApi.get(`/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error al cargar el producto:', error);
        throw error
    }
}

export const saveProduct = async (product) => {

    if (!product) {
        const error = new Error('Producto no definido');
        console.error(error.message);
        throw error;
    }

    try {
        const res = await requestProductApi.post('/', product);
        return res;
    } catch (error) {
        console.error('Error al guardar el producto:', error.response?.data);
        throw error
        
    }
}

export const deleteProduct = async (id) => {

    if (!id) {
        const error = new Error('ID de producto no definido');
        console.error(error.message);
        throw error;
    }

    try {
        const res = await requestProductApi.delete(`/${id}/`);
        return res;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error
    }
}

export const updateProduct = async (id, product) => {

    if (!id) {
        const error = new Error('ID de producto no definido');
        console.error(error.message);
        throw error;
    }

     if (!product) {
        const error = new Error('Producto no definido');
        console.error(error.message);
        throw error;
    }

    try {
        const res = await requestProductApi.put(`/${id}/`, product)
        return res;
    } catch (error) {
        console.error('Error al atualizar el producto:', error);
        throw error
    }
}

export const getPaginatedProducts = async (page = 1, pageSize = 10) => {
  try {
    const res = await requestProductApi.get('/', {
      params: { page, pageSize },
    });
    return res.data; // espera { items: [...], totalPages: n }
  } catch (error) {
    console.error('Error al cargar productos paginados:', error);
    throw error;
  }
};


export const getAllCategories = async() => {
    try {
        const res = await requestCategoryApi.get('/')
        return res.data;
    } catch (error) {
        console.error('Error al cargar las cetegorias:', error);
        throw error;
    }
}

export const downloadProductPdf = async (id) => {
     if (!id) {
        const error = new Error('ID de producto no definido');
        console.error(error.message);
        throw error;
    }
    try {
        const res = await requestPdf.get(`/${id}/`, {
            responseType: 'blob'
        })
        return res
    } catch (error) {
        console.error('Error al procesar el documento', error);
        throw error;
        
    }
}

export const downloadProductsExcel = async () => {
    try {
        const res = await requestExcel.get('/', {
            responseType: 'blob',
        })
        return res
    } catch (error) {
        console.error('Error al procesar el documento', error);
        throw error;
    }
}
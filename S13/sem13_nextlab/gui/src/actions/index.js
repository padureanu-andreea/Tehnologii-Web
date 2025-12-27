import { SERVER } from '../config/global'

const buildUrl = (path, filterString = '', page = 0, pageSize = 10, sortField = '', sortOrder = '') => {
    return `${SERVER}${path}?${filterString}&sortField=${sortField}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`;
}

export const getBooks = (filterString = '', page = 0, pageSize = 10, sortField = '', sortOrder = '') => {
  return {
    type: 'GET_BOOKS',
    payload: async () => {
      try {
        const url = buildUrl('/books', filterString, page, pageSize, sortField, sortOrder);
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) throw data;
        return data;
      } catch (e) {
        throw e;
      }
    }
  }
}

export const addBook = (book, filterString = '', page = 0, pageSize = 10, sortField = '', sortOrder = '') => {
  return {
    type: 'ADD_BOOK',
    payload: async () => {
      try {
        let response = await fetch(`${SERVER}/books`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book)
        });
        if (!response.ok) throw await response.json();

        const url = buildUrl('/books', filterString, page, pageSize, sortField, sortOrder);
        response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (e) {
        throw e;
      }
    }
  }
}

export const saveBook = (id, book, filterString = '', page = 0, pageSize = 10, sortField = '', sortOrder = '') => {
  return {
    type: 'SAVE_BOOK',
    payload: async () => {
      try {
        let response = await fetch(`${SERVER}/books/${id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book)
        });
        if (!response.ok) throw await response.json();

        const url = buildUrl('/books', filterString, page, pageSize, sortField, sortOrder);
        response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (e) {
        throw e;
      }
    }
  }
}

export const deleteBook = (id, filterString = '', page = 0, pageSize = 10, sortField = '', sortOrder = '') => {
  return {
    type: 'DELETE_BOOK',
    payload: async () => {
      try {
        let response = await fetch(`${SERVER}/books/${id}`, {
          method: 'delete'
        });
        if (!response.ok) throw await response.json();

        const url = buildUrl('/books', filterString, page, pageSize, sortField, sortOrder);
        response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (e) {
        throw e;
      }
    }
  }
}
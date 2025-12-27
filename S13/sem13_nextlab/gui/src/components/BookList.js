import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks, addBook, saveBook, deleteBook } from '../actions';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

import BookSummaryChart from './BookSummaryChart';

const bookSelector = state => state.book.bookList;

function BookList() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [pageCount, setPageCount] = useState('');
    
    const [isDialogShown, setIsDialogShown] = useState(false);
    const [isChartDialogShown, setIsChartDialogShown] = useState(false);

    const [isNewRecord, setIsNewRecord] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [filterString, setFilterString] = useState('');

    const [filters, setFilters] = useState({
        'title': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'content': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const dispatch = useDispatch();
    const books = useSelector(bookSelector);

    const handleFilter = (e) => {
        const newFilters = e.filters;
        setFilters(newFilters);
        const keys = Object.keys(newFilters);
        const computedFilterString = keys.map(key => {
            return { key: key, value: newFilters[key].value };
        }).filter(e => e.value).map(e => `${e.key}=${e.value}`).join('&');
        setFilterString(computedFilterString);
    }

    useEffect(() => {
        dispatch(getBooks(filterString));
    }, [dispatch, filterString]);

    const handleAddClick = () => {
        setIsDialogShown(true);
        setIsNewRecord(true);
        setTitle('');
        setContent('');
        setPageCount('');
    }

    const hideDialog = () => {
        setIsDialogShown(false);
    }

    const hideChartDialog = () => {
        setIsChartDialogShown(false);
    }

    const handleSaveClick = () => {
        const bookData = { 
            title, 
            content, 
            pageCount: pageCount ? parseInt(pageCount) : null
        };

        if (isNewRecord) {
            dispatch(addBook(bookData, filterString));
        } else {
            dispatch(saveBook(selectedId, bookData, filterString));
        }
        setIsDialogShown(false);
        setIsNewRecord(true);
        setTitle('');
        setContent('');
        setPageCount('');
    }

    const opsTemplate = (rowData) => {
        return (
            <Button 
                label="Delete"
                icon="pi pi-times" 
                className="p-button-danger p-button-sm" 
                onClick={() => dispatch(deleteBook(rowData.id, filterString))} 
            />
        );
    }

    const tableFooter = (
        <div>
            <Button label="Add Book" icon="pi pi-plus" onClick={handleAddClick} className="mr-2" />
            <Button label="Show Charts" icon="pi pi-chart-pie" className="p-button-help" onClick={() => setIsChartDialogShown(true)} />
        </div>
    );

    const dialogFooter = (
        <div>
            <Button label="Save" icon="pi pi-check" onClick={handleSaveClick} />
        </div>
    );

    return (
        <>
            <DataTable 
                value={books} 
                footer={tableFooter} 
                filters={filters} 
                onFilter={handleFilter}
                dataKey="id"
                paginator 
                rows={5} 
                rowsPerPageOptions={[5, 10, 25]}
            >
                <Column header="Title" field="title" sortable filter filterPlaceholder="Search by title" />
                <Column header="Content" field="content" sortable filter filterPlaceholder="Search content" />
                <Column header="Pages" field="pageCount" sortable /> 
                <Column body={opsTemplate} header="Options" style={{ width: '10em' }} />
            </DataTable>

            <Dialog header="Book Details" onHide={hideDialog} visible={isDialogShown} footer={dialogFooter}>
                <div>
                    <div style={{marginBottom: '10px'}}>
                        <InputText placeholder='Title' onChange={(evt) => setTitle(evt.target.value)} value={title} style={{width: '100%'}}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <InputText placeholder='Content' onChange={(evt) => setContent(evt.target.value)} value={content} style={{width: '100%'}}/>
                    </div>
                    <div>
                        <InputText placeholder='Page Count' type="number" onChange={(evt) => setPageCount(evt.target.value)} value={pageCount} style={{width: '100%'}}/>
                    </div>
                </div>
            </Dialog>

            <Dialog 
                header="Statistics Dashboard" 
                visible={isChartDialogShown} 
                style={{ width: '60vw' }} 
                onHide={hideChartDialog}
                maximizable 
            >
                <BookSummaryChart books={books} />
            </Dialog>
        </>
    );
}

export default BookList;
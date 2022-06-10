import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { IProduct } from './product';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private productUrl = 'api/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        )
    }

    getProduct(id: number): Observable<IProduct> {
        if (id === 0) {
            return of(this.initializeProduct());
        }
        const url = `${this.productUrl}/${id}`;
        return this.http.get<IProduct>(url).pipe(
            tap(data => console.log('getProduct: ' + JSON.stringify(data))),
            catchError(this.handleError)
        )
    }

    updateProduct(product: IProduct): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productUrl}/${product.id}`;
        return this.http.put<IProduct>(url, product, { headers }).pipe(
            tap(data => console.log('updateProduct: ', product.id)),
            //Return the product on an update
            map(() => product),
            catchError(this.handleError)
        )
    }

    deleteProduct(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productUrl}/${id}`;
        return this.http.delete<IProduct>(url, { headers }).pipe(
            tap(data => console.log('deleteProduct: ', id)),
            catchError(this.handleError)
        )
    }

    handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

    initializeProduct(): IProduct {
        return {
            id: 0,
            productName: '',
            productCode: '',
            releaseDate: '',
            price: 0,
            tags: [''],
            description: '',
            starRating: 0,
            imageUrl: ''
        }
    }
}
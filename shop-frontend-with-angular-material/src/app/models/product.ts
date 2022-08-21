import { Category } from './category';

export class Product {
        constructor(
            public id?: number,
            public title?: string,
            public price?: number,
            public quantity?: number,
            public description?: string,
            public image?: string,
            public category?: Category
            ){}
}

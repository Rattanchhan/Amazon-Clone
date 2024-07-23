import {Clothing, Product,Appliances} from "./products.js";
import { formatCurrency } from "../script/utils/money.js";

describe('test suite: proudcts', () => {
    it('product class',()=>{
        const product = new Product(
            {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                    stars: 4.5,
                    count: 87
                },
                priceCents: 1090
            }
        );
        expect(product.id
        ).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

        expect(product.image
        ).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg");

        expect(product.name
        ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");

        expect(product.rating.stars
        ).toEqual(4.5);

        expect(product.rating.count
        ).toEqual(87);

        expect(product.priceCents
        ).toEqual(1090);

        expect(product.getStarUrl()
        ).toEqual(`images/ratings/rating-${product.rating.stars * 10}.png`);

        expect(product.getPrice()
        ).toEqual(`$${formatCurrency(product.priceCents)}`);

        expect(product.extraInforHTML()
        ).toEqual('');
    });
    it('Clothing class', () => {
        const clothing = new Clothing(
            {
                id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
                name: "Adults Plain Cotton T-Shirt - 2 Pack",
                rating: {
                    stars: 4.5,
                    count: 56
                },
                priceCents: 799,
                keywords: [
                    "tshirts",
                    "apparel",
                    "mens"
                ],
                type: "clothing",
                sizeChartLink: "images/clothing-size-chart.png"
            }
        );
        expect(clothing.id
        ).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

        expect(clothing.image
        ).toEqual("images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg");

        expect(clothing.name
        ).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");

        expect(clothing.rating.stars
        ).toEqual(4.5);

        expect(clothing.rating.count
        ).toEqual(56);

        expect(clothing.priceCents
        ).toEqual(799);

        expect(clothing.getStarUrl()
        ).toEqual(`images/ratings/rating-${clothing.rating.stars * 10}.png`);

        expect(clothing.getPrice()
        ).toEqual(`$${formatCurrency(clothing.priceCents)}`);

        expect(clothing.extraInforHTML()
        ).toEqual(`<a href="${clothing.sizeChartLink}" target="_blank">Size chart</a>`);
    });

    it('Appliance class', () => {
        const appliance = new Appliances(
            {
                id: "54e0eccd-8f36-462b-b68a-8182611d9add",
                image: "images/products/black-2-slot-toaster.jpg",
                name: "2 Slot Toaster - Black",
                rating: {
                    stars: 5,
                    count: 2197
                },
                priceCents: 1899,
                keywords: [
                    "toaster",
                    "kitchen",
                    "appliances"
                ],
                type: 'appliance',
                instructionsLink: 'images/appliance-instructions.png',
                warrantyLink: 'images/appliance-warranty.png'
            }
        );
        expect(appliance.id
        ).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");

        expect(appliance.image
        ).toEqual("images/products/black-2-slot-toaster.jpg");

        expect(appliance.name
        ).toEqual("2 Slot Toaster - Black");

        expect(appliance.rating.stars
        ).toEqual(5);

        expect(appliance.rating.count
        ).toEqual(2197);

        expect(appliance.priceCents
        ).toEqual(1899);

        expect(appliance.getStarUrl()
        ).toEqual(`images/ratings/rating-${appliance.rating.stars * 10}.png`);

        expect(appliance.getPrice()
        ).toEqual(`$${formatCurrency(appliance.priceCents)}`);

        expect(appliance.extraInforHTML()
        ).toContain(`<a href="${appliance.instructionsLink}" target="_blank">Instructions</a>`);
    });
});
export  class OrderPost{

    public id:number;
    public identity:string;
    public cartPriceTotal:number;
    public city:string;
    public address:string;
    public shippingDate:string;
    public creditCard:number;

    constructor(params:Partial<OrderPost>={}){
        Object.assign(
            this,
            {
                ...params
            }
        )
    }
}



export abstract class AbstractRestService<T>{
    
    constructor(protected url : string){}

    listFromUrl () : T[]{
        return null;
    }

}